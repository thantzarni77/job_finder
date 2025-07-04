<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ForgotPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class NewPasswordController extends Controller
{
    public function forgotPassword(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                'email' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Invalid email',
                    'errors' => $validator->errors()
                ], 422);
            }
    
            $token = Str::random(60);
            ForgotPassword::where('email', $request->email)->delete();
    
            $forgot = ForgotPassword::create([
                'email' => $request->email,
                'token' => $token,
            ]);
    
            return response()->json([
                'message' => 'Reset token generated.',
                'token' => $forgot,
            ]);

        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }

    }

    public function resetPassword(Request $request)
    {
        try{

            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'token' => 'required',
                'password' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Invalid input.',
                    'errors' => $validator->errors()
                ], 422);
            }
    
            $record = ForgotPassword::where('email', $request->email)->where('token', $request->token)->first();
            if (!$record) {
                return response()->json(['message' => 'Invalid or expired token.'], 400);
            }
    
            $user = User::where('email', $request->email)->first();
            $user->password = Hash::make($request->password);
            $user->save();
    
            ForgotPassword::where('email', $request->email)->delete();
            return response()->json(['message' => 'Password successfully reset.']);

        }catch(\Exception $e){
            return response()->json([
                "message" => $e->getMessage()
            ]);
        }
    }
}
