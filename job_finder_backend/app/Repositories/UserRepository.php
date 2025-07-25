<?php
namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{

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
