<?php

namespace App\Traits;

trait HttpResponseTrait
{

    public function successAuthResponse($message,$data,$token,$statuscode = 200){
        return response()->json([
            "message"=> $message,
            "status"=>"passes",
            "data"=>[
                'user_id' => $data->id,
                'user_name' => $data->name,
                'user_email' => $data->email,                
                'user_type' => $data->user_type,
                'token' => $token,
            ]
        ],$statuscode);
    }

    public function successResponse($message,$data,$statuscode = 200){
        return response()->json([
            "message"=> $message,
            "status"=>"passes",
            "data"=>[
                'user_id' => $data->id,
                'user_name' => $data->name,
                'user_email' => $data->email,                
                'user_type' => $data->user_type,
            ]
        ],$statuscode);
    }

    public function erorsResponse($message,$data,$statuscode = 500){
        return response()->json([
            "message"=> $message,
            "status"=>"fail",
            "data"=>$data
        ],$statuscode);
    }
}
