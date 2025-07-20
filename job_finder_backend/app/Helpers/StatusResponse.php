<?php

namespace App\Helpers;

class StatusResponse
{
    public static function success($data = null, $message = "success")
    {
        return response()->json(['data' => $data, 'message', $message], 200);
    }
}
