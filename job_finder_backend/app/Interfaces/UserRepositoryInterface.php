<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    public function getSingleUserData();
    public function updateUser(Request $request, $id);
}
