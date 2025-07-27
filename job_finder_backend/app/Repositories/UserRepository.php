<?php
namespace App\Repositories;

use App\Http\Resources\UserResource;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserRepository implements UserRepositoryInterface
{

    public function getSingleUserData()
    {
        $user = User::where('id', JWTAuth::user()->id)->first();
        return new UserResource($user);
    }

    public function updateUser($request, $id)
    {
        $validatedData = $request->validate([
            "name"            => "required",
            "email"           => "required",
            'phone'           => "nullable",
            'address'         => "nullable",
            "profile_picture" => "image|mimes:jpeg,png,jpg,gif,svg",
        ]);

        $user = User::findorFail($id);
        if ($request->hasFile('profile_picture')) {
            $path = $user->profile_picture;

            if (File::exists($path)) {
                File::delete($path);
            }
        }

        if (file_exists($request['profile_picture'])) {
            $file         = $request['profile_picture'];
            $fname        = $file->getClientOriginalName();
            $imagenewname = uniqid($id) . $id . $fname;
            $file->move(public_path('assets/img/user-profile/'), $imagenewname);
            $filepath                         = 'assets/img/user-profile/' . $imagenewname;
            $validatedData['profile_picture'] = $filepath;
        }

        $updatedUser = User::where('id', $id)->update($validatedData);

        return response()->json([
            "message" => "User Updated Successfully",
            "data"    => $updatedUser,
        ], 200);

    }
}
