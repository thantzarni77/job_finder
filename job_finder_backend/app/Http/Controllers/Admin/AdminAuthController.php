<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Auth\User as Authenticatable;

class AdminAuthController extends Controller
{
    public function register(Request $request){
        try{
            $validator = Validator::make($request->all(),[
                "name" => "required",
                "email" => "required",
                "password"=> "required",
            ]);

            if ($validator->fails()){
                return response()->json([
                    "message" => $validator->errors()
                ]);
            }

            $refresh_token = Str::random(60);

            $admin = Admin::create([
                "name" => $request->name,
                "email"=> $request->email,
                "refresh_token" => hash('sha256', $refresh_token),
                "password" => Hash::make($request->password)
            ]);

            $token = JWTAuth::fromUser($admin);
            return response()->json([
                "message" => "Admin registered successfully",
                "data" => [
                    'admin_name' => $admin->name,
                    'admin_email' => $admin->email,
                    'admin_id' => $admin->id,
                    'token' => $token,
                ]
            ],201)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }
    }

    public function login(Request $request){

        try{

            $cre = $request->only("email","password");
            if (!$token = auth('admin')->attempt($cre)) {
                return response()->json([
                    'statusCode' => 401,
                    'message' => 'Wrong email or password'
                ], 401);
            }

            if(!$token){
                return response()->json([
                    'statusCode' => 401,
                    "message" => "wrong email or password"
                ],401);
            };

            $admin = auth('admin')->user();
            $refresh_token = Str::random(60);

            $admin->update([
                'refresh_token' => hash('sha256', $refresh_token),
            ]);

            return response()->json([
                "message" => "Login successfully",
                "data" => [
                    'admin_name' => $admin->name,
                    'admin_email' => $admin->email,
                    'admin_id' => $admin->id,
                    'token' => $token,
                ]
            ],200)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }

    }

    public function profile(){
        try {
            $admin = auth('admin')->user();
    
            if (!$admin) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
    
            return response()->json([
                'admin_name' => $admin->name,
                'admin_email' => $admin->email,
                'id' => $admin->id,
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }    
 
    }

    public function logout(){
        try{
            // auth()->guard("admin")->logout();
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                "message" => "logout successfully"
            ]);
        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }
    }

}
