<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface UserRepositoryInterface
{
    public function getAllUsers();
    public function getSingleUserData();
    public function updateUser(Request $request, $id);
    public function getIndividualEmployerData($id);
}
