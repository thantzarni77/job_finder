<?php
namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\HttpResponseTrait;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    use HttpResponseTrait;
    public function register(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                "name"      => "required",
                "email"     => "required|email|unique:users",
                "password"  => "required|min:6",
                "user_type" => "nullable|in:admin,seeker,employer,super admin",
            ]);

            if ($validator->fails()) {
                return $this->erorsResponse("Validator fails", $validator->messages());
            }

            $refresh_token = Str::random(60);

            //user account checking and creation
            if ($request->user_type === "admin") {
                //can not create admin account if user_type is seeker and employer
                return response()->json(['error' => 'Admin account can not be created'], 400);
            } else {
                $user = User::create([
                    "name" => $request->name,
                    "email" => $request->email,
                    "password" => Hash::make($request->password),
                    'refresh_token' => hash('sha256', $refresh_token),
                    "user_type" => $request->user_type ?? "seeker"
                ]);
            }

            $token = JWTAuth::fromUser($user);

            return $this->successAuthResponse("Register Success", $user, $token, 201)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

        } catch (JWTException $e) {
            return $this->erorsResponse("Register Failed", null, 500);
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
                "name" => "required",
                "email" => "required|email|unique:users",
                "password" => "required|min:6",
            ]);
            //if validation fails cancel the request
            if ($validated->fails()) {
                return $this->erorsResponse("Validator fails", $validated->messages());
            };

            $refresh_token = Str::random(60);

            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "refresh_token" => hash('sha256', $refresh_token),
                "user_type" => "admin"
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'statusCode' => 200,
                'message' => 'Admin account created successfully',
                'data' => [
                    'data' => $user,
                    'token' => $token,
                ]
            ]);
        } else {
            //if user is not super admin cancel the request
            return response()->json([
                'statusCode' => 403,
                'message' => 'You are not authorized to create admin account',
            ]);
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
