<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IndividualEmployer;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request){

        try{
            $validator = Validator::make($request->all(),[
                "title" => "required",
                "message" => "required"
            ]);
    
            if($validator->fails()){
                return $this->erorsResponse("Validator fails",$validator->messages());
            }
        
            $individualemployer = new IndividualEmployer();
            $individualemployer->title = $request->title;
            $individualemployer->message = $request->message;
            $individualemployer->save();
    
            return response()->json([
                "message" => "success created",
                "data"=> $individualemployer
            ],201);
        }catch(\Exception $e){
            return response()->json([
                "message"=> "created failed"
            ],500);
        }
    }


}
