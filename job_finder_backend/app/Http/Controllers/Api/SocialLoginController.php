<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Google_Client;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class SocialLoginController extends Controller
{
    use HttpResponseTrait;
    public function socialLogin(Request $request, $provider){
        if ($provider !== 'google') {
            return response()->json(['error' => 'Unsupported provider'], 400);
        }

        $idToken = $request->input('token');
        $client = new Google_Client(['client_id' => config('services.google.client_id')]);

        try{

            $payload = $client->verifyIdToken($idToken);

            if ($payload){
                $googleId = $payload['sub'];
                $email = $payload['email'];
                $name = $payload['name'] ?? null;

                $refresh_token = Str::random(60);

                $user = User::UpdateOrCreate(['provider_id' => $googleId], [
                    "name" => $name,
                    "provider" => $provider,
                    "provider_id" => $googleId,
                    "provider_token" => $idToken,
                    "profile_picture" => $payload['picture'] ?? null,
                "email" => $email
                ]);

                $token = JWTAuth::fromUser($user);
                return $this->SuccessAuthResponse("Login successfully",$user,$token)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

            }

        }catch(JWTException $e){
            return $this->erorsResponse("Unauthenticated",null,401);
        }

    }
}
