<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\SeekerController;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    use HttpResponseTrait;
    public function registerStepOne(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                "name"      => "required",
                "email"     => "required|email|unique:users",
                "password"  => "required|min:6",
                "phone"     => "required",
                "address"   => "required",
                "user_type" => "nullable|in:seeker,employer",
            ]);

            if ($validator->fails()) {
                return $this->erorsResponse("Validator fails", $validator->messages());
            }

            $refresh_token = Str::random(60);

            $user = User::create([
                "name"          => $request->name,
                "email"         => $request->email,
                "phone"         => $request->phone,
                "address"       => $request->address,
                "password"      => Hash::make($request->password),
                'refresh_token' => hash('sha256', $refresh_token),
                "user_type"     => $request->user_type ?? "seeker",
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                "message" => "Success created",
                "data"    => [
                    "token" => $token,
                    "id"    => $user->id,
                ],
            ], 201)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

        } catch (JWTException $e) {
            return $this->erorsResponse("Register Failed", null, 500);
        }
    }

    public function registerStepTwo(Request $request, string $id)
    {

        try {

            if ($request->has('role') && $request->role === 'individual') {
                $individualEmployerController = new IndividualEmployerController();
                return $individualEmployerController->store($request);
            }

            $userData = User::where("id", $id)->first();

            if (! $userData) {
                return $this->erorsResponse("User not found", null, 404);
            }

            if ($userData->user_type === "employer") {
                $employerController = new EmployerController();
                return $employerController->store($request, $userData->id);
            }

            if ($userData->user_type === "seeker") {
                $seekerController = new SeekerController();
                return $seekerController->store($request, $userData->id);
            }

            return $this->erorsResponse("User type is invalid", null, 404);

        } catch (\Exception $e) {
            return $this->erorsResponse("Unexpected error occurred", null, 500);
        }

    }

    public function login(Request $request)
    {
        $cred  = $request->only("email", "password");
        $token = JWTAuth::attempt($cred);

        if (! $token) {
            return $this->erorsResponse("Invalid Email or Password", null, 401);
        }

        $user          = JWTAuth::user();
        $refresh_token = Str::random(60);
        $user->update([
            'refresh_token' => hash('sha256', $refresh_token),
        ]);
        return $this->successAuthResponse("Login Success", $user, $token)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

    }

    public function profile()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return $this->successResponse("Success", $user);
        } catch (JWTException $e) {
            return $this->erorsResponse("Unauthenticated", null, 401);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'status'  => 200,
                "message" => "Logout success",
            ], 200)->cookie('refresh_token', null, -1, null, null, true, true);

        } catch (JWTException $e) {
            return $this->erorsResponse("Unauthenticated", null, 401);
        }
    }

    public function removeUser(Request $request)
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        $request->user()->delete();

        return response()->json([
            'message' => 'Successfully deleted your account.',
        ])->cookie('refresh_token', null, -1, '/', null, true, true);
    }

    public function adminAccountCreation(Request $request)
    {

        if (Auth::user()->user_type === "super admin") {
            //check validation
            $validated = Validator::make($request->all(), [
                "name"     => "required",
                "email"    => "required|email|unique:users",
                "password" => "required|min:6",
            ]);
            //if validation fails cancel the request
            if ($validated->fails()) {
                return $this->erorsResponse("Validator fails", $validated->messages());
            }

            $refresh_token = Str::random(60);

            $user = User::create([
                "name"          => $request->name,
                "email"         => $request->email,
                "password"      => Hash::make($request->password),
                "refresh_token" => hash('sha256', $refresh_token),
                "user_type"     => "admin",
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'statusCode' => 200,
                'message'    => 'Admin account created successfully',
                'data'       => [
                    'data'  => $user,
                    'token' => $token,
                ],
            ]);
        } else {
            //if user is not super admin cancel the request
            return response()->json([
                'statusCode' => 403,
                'message'    => 'You are not authorized to create admin account',
            ]);
        }
    }

    public function updateMail(Request $request)
    {
        try {
            // Validate the new email
            $validator = Validator::make($request->all(), [
                'email' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Invalid email.',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            // Get authenticated user
            $user = JWTAuth::parseToken()->authenticate();

            // Update the email
            $user->email = $request->input('email');
            $user->save();

            return response()->json([
                'status'  => 'success',
                'message' => 'Email updated successfully.',
                'data'    => $user,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the email.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function refresh(Request $request)
    {

        $refresh_token        = $request->cookie('refresh_token');
        $hashed_refresh_token = hash('sha256', $refresh_token);
        $user                 = User::where('refresh_token', $hashed_refresh_token)->first();

        if (! $user) {
            return $this->erorsResponse("Unauthenticated", null, 401);
        }

        try {
            $new_access_token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return $this->erorsResponse("Could not refresh token", null, 500);
        }

        return response()->json([
            'statusCode' => 200,
            'message'    => 'Access token refreshed successfully',
            'data'       => [
                'access_token' => $new_access_token,
            ],
        ], 200);
    }

}
