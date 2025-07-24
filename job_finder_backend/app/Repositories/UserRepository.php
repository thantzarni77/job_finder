<?php
namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;

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

        return response()->json([
            "message" => "User Updated Successfully",
            "data"    => $updatedUser,
        ], 200);

    }
}
