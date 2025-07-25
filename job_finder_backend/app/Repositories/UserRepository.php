<?php
namespace App\Repositories;

use App\Http\Resources\UserResource;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
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
            "name"    => "required",
            "email"   => "required",
            'phone'   => "nullable",
            'address' => "nullable",
        ]);

        $updatedUser = User::where('id', $id)->update($validatedData);

        return response()->json([
            "message" => "User Updated Successfully",
            "data"    => $updatedUser,
        ], 200);

    }
}
