<?php
namespace App\Http\Controllers;

use App\Interfaces\AuthRepositoryInterface;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthRepositoryInterface $authRepositoryInterface;
    public function __construct(AuthRepositoryInterface $authRepositoryInterface)
    {
        $this->authRepositoryInterface = $authRepositoryInterface;
    }

    public function login(Request $request)
    {
        return $this->authRepositoryInterface->login($request);
    }

}
