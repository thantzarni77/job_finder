<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface AuthRepositoryInterface
{
    public function login(Request $request);
}
