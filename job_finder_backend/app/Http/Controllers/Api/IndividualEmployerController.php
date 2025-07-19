<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IndividualEmployer;
use App\Models\User;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class IndividualEmployerController extends Controller
{
    use HttpResponseTrait;

    public function index(){
        $individualemployer = IndividualEmployer::all();
        return response()->json([
            "statusCode" => "200",
            "message" => "passes",
            "data" => $individualemployer
        ],200);
    }

    public function getdata(string $id){
        try{
            $data = IndividualEmployer::findOrFail($id);
            return response()->json([
                "data" => $data
            ]);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Data not Found"
            ],404);
        }
    }

    public function getIndiEmployerData(string $id){
        try {
            $data = IndividualEmployer::where("user_id", $id)->get();
    
            if ($data->isEmpty()) {
                return response()->json([
                    "message" => "Individual Employer data not found."
                ], 404);
            }
    
            return response()->json([
                "message" => "Success",
                "data" => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request,string $id){

        try{
            $validator = Validator::make($request->all(),[
                "title" => "required",
                "message" => "required",
                "password" => "required|min:8"
            ]);
    
            if($validator->fails()){
                return $this->erorsResponse("Validator fails",$validator->messages());
            }
        
            $refresh_token = Str::random(60);
            $user_id = $id;
            $individualemployer = new IndividualEmployer();
            $individualemployer->title = $request->title;
            $individualemployer->message = $request->message;
            $individualemployer->user_id = $user_id;
            $user = User::UpdateOrCreate(['id' => $user_id], [
                "password" => Hash::make($request->password)
            ]);
    
            $token = JWTAuth::fromUser($user);
            $individualemployer->save();
    
            return response()->json([
                "message" => "success created",
                "data"=> $individualemployer,
                "token" => $token
            ],201)->cookie('refresh_token', $refresh_token, 60 * 24 * 7, null, null, true, true);

        }catch(\Exception $e){
            return response()->json([
                "message"=> "created failed"
            ],500);
        }
    }


}
