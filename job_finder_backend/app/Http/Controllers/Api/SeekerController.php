<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Seeker;
use App\Models\Talent;
use App\Helpers\Filters;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\HttpResponseTrait;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\SeekerResource;
use App\Http\Resources\SeekerCollection;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\TalentFilterRequest;

class SeekerController extends Controller
{
    use HttpResponseTrait;
    public function index(Request $request, TalentFilterRequest $talentRequest)
    {
        // $talent = $talentRequest->validated();
        // $filter = new Filters($talent);
        // $seekers = Seeker::filter($filter)->paginate(1);
        // if ($request->query('talentName')) {
        //     $talentName = $request->query('talentName');
        // }

        if ($request->query('talentName')) {
            $talentName = $request->query('talentName');
            $seekers = Seeker::whereHas('user', function ($query) use ($talentName) {
                $query->where('name', 'LIKE', "%{$talentName}%")->where('user_type', 'seeker');
            })
                ->orWhere('role', 'LIKE', "%{$talentName}%")
                ->orWhere(
                    'talent',
                    'LIKE',
                    "%{$talentName}%"
                )
                ->paginate(10);
        } else {
            $talent = $talentRequest->validated();
            $filter = new Filters($talent);
            $seekers = Seeker::filter($filter)->paginate(10);
        }
        return new SeekerCollection($seekers);
        // return response()->json([
        //     'talent' => $request->talent,
        //     "statusCode" => "200",
        //     "message"    => "passes",
        //     "data"       => SeekerResource::collection($seekers),

        // ], 200);
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

        try {
            $validator = Validator::make($request->all(), [
                "skills"            => "required",
                "education"         => "required",
                "work_experience"   => "nullable",
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
        } catch (\Exception $e) {
            return response()->json(["message" => "Data not found"], 404);
        }
    }

    public function update(Request $request, string $id)
    {

        $validator = Validator::make($request->all(), [
            "skills"            => "required",
            "education"         => "required",
            "work_experience"   => "nullable",
            "role"              => "required",
            "bio"               => "required",
            "talent"            => "required",
            "social_media_link" => "nullable",
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
