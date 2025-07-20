<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeekerResource;
use App\Models\Seeker;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class SeekerController extends Controller
{
    use HttpResponseTrait;
    public function index(Request $request)
    {

        $seekers = Seeker::all();
        return response()->json([
            "statusCode" => "200",
            "message"    => "passes",
            "data"       => SeekerResource::collection($seekers),
        ], 200);
    }

    public function getdata(Request $request, string $id)
    {
        try {
            $data = Seeker::findOrFail($id);
            return new SeekerResource($data);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Data not Found",
            ], 404);
        }
    }

    public function getSeekerData(string $id)
    {
        try {
            $data = Seeker::where("user_id", $id)->get();

            if ($data->isEmpty()) {
                return response()->json([
                    "message" => "Seeker data not found.",
                ], 404);
            }

            return SeekerResource::collection($data);

        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred.",
                "error"   => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request, string $id)
    {

        $validator = Validator::make($request->all(), [
            "skills"            => "required",
            "education"         => "required",
            "work_experience"   => "required",
            "role"              => "required",
            "bio"               => "required",
            "talent"            => "required",
            "social_media_link" => "nullable",
            "password"          => "required|min:8",
            "image"             => "required",

        ]);

        if ($validator->fails()) {
            return $this->erorsResponse("Validator fails", $validator->messages());
        }

        $refresh_token = Str::random(60);

        $user_id                   = $id;
        $seeker                    = new Seeker();
        $seeker->user_id           = $user_id;
        $seeker->skills            = json_encode($request->skills);
        $seeker->education         = json_encode($request['education']);
        $seeker->work_experience   = json_encode($request['work_experience']);
        $seeker->role              = $request['role'];
        $seeker->talent            = $request['talent'];
        $seeker->social_media_link = json_encode($request['social_media_link']);
        $seeker->bio               = $request['bio'];

        if (file_exists($request['image'])) {
            $file         = $request['image'];
            $fname        = $file->getClientOriginalName();
            $imagenewname = uniqid($user_id) . $user_id . $fname;
            $file->move(public_path('assets/img/seekers/'), $imagenewname);
            $filepath      = 'assets/img/seekers/' . $imagenewname;
            $seeker->image = $filepath;
        }

        $user = User::UpdateOrCreate(['id' => $user_id], [
            "password" => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);
        $seeker->save();

        return $this->successResponseSeeker("Success created", $seeker, $token, 201)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

    }

    public function update(Request $request, string $id)
    {

        $validator = Validator::make($request->all(), [
            "skills"            => "required",
            "education"         => "required",
            "work_experience"   => "required",
            "role"              => "required",
            "bio"               => "required",
            "talent"            => "required",
            "social_media_link" => "nullable",
            "image"             => "required",
        ]);

        if ($validator->fails()) {
            return $this->erorsResponse("Validator fails", $validator->messages());
        }

        $user    = Auth::user();
        $user_id = $user->id;

        $seeker                    = Seeker::findOrFail($id);
        $seeker->user_id           = $user_id;
        $seeker->skills            = json_encode($request->skills);
        $seeker->education         = json_encode($request['education']);
        $seeker->work_experience   = json_encode($request['work_experience']);
        $seeker->role              = $request['role'];
        $seeker->talent            = $request['talent'];
        $seeker->social_media_link = json_encode($request['social_media_link']);
        $seeker->bio               = $request['bio'];

        if ($request->hasFile('image')) {
            $path = $seeker->image;

            if (File::exists($path)) {
                File::delete($path);
            }
        }

        if (file_exists($request['image'])) {
            $file         = $request['image'];
            $fname        = $file->getClientOriginalName();
            $imagenewname = uniqid($user_id) . $user_id . $fname;
            $file->move(public_path('assets/img/seekers/'), $imagenewname);
            $filepath      = 'assets/img/seekers/' . $imagenewname;
            $seeker->image = $filepath;
        }

        $seeker->save();

        return $this->successResponseSeeker("Success updated", $seeker, 200);

    }

    public function destroy(string $id)
    {

        $seeker = Seeker::findOrFail($id);
        $path   = $seeker->image;
        if (File::exists($path)) {
            File::delete($path);
        }
        $seeker->delete();
        return response()->json([
            "statusCode" => "200",
            "message"    => "Success deleted",
        ]);
    }
}
