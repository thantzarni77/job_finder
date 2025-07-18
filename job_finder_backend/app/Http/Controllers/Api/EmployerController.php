<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployerResource;
use App\Models\Employer;
use App\Traits\HttpResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class EmployerController extends Controller
{
    use HttpResponseTrait;

    public function index(){
        $employer = Employer::all();
        return response()->json([
            "statusCode" => "200",
            "message" => "passes",
            "data" => EmployerResource::collection($employer)
        ],200);
    }

    public function getdata(string $id){
        try{
            $data = Employer::findOrFail($id);
            return new EmployerResource($data);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Data not Found"
            ],404);
        }
    }

    public function store(Request $request,string $id){

        $validator = Validator::make($request->all(),[
            "company_name" => "required",
            "company_address" => "required",
            "company_phone" => "required",
            "company_email" => "required|email",
            "company_type" => "required",
            "verification" => "required",
            "company_image" => "required"
        ]);

        if($validator->fails()){
            return $this->erorsResponse("Validator fails",$validator->messages());
        }
        
        $user_id = $id;

        $employer = new Employer();
        $employer->user_id = $user_id;
        $employer->company_name = $request->company_name;
        $employer->company_address = $request['company_address'];
        $employer->company_phone = $request['company_phone'];
        $employer->company_email = $request['company_email'];
        $employer->company_type = $request['company_type'];
        $employer->verification = $request['verification'];

        if(file_exists($request['company_image'])){
            $file = $request['company_image'];
            $fname = $file->getClientOriginalName();
            $imagenewname = uniqid($user_id).$user_id.$fname;
            $file->move(public_path('assets/img/employers/'),$imagenewname);
            $filepath = 'assets/img/employers/'.$imagenewname;
            $employer->company_image = $filepath;
        }

        $employer->save();

        return $this->successResponseEmployer("Success created",$employer);
    }


    public function update(Request $request,string $id){

        $validator = Validator::make($request->all(),[
            "company_name" => "required",
            "company_address" => "required",
            "company_phone" => "required",
            "company_email" => "required|email",
            "company_type" => "required",
            "verification" => "required",
            "company_image" => "required"
        ]);

        if($validator->fails()){
            return $this->erorsResponse("Validator fails",$validator->messages());
        }

        $user = Auth::user();
        $user_id = $user->id;

        $employer = Employer::findOrFail($id);
        $employer->user_id = $user_id;
        $employer->company_name = $request->company_name;
        $employer->company_address = $request['company_address'];
        $employer->company_phone = $request['company_phone'];
        $employer->company_email = $request['company_email'];
        $employer->company_type = $request['company_type'];
        $employer->verification = $request['verification'];

        if($request->hasFile('company_image')){
            $path = $employer->company_image;

            if(File::exists($path)){
                File::delete($path);
            }
        }

        if(file_exists($request['company_image'])){
            $file = $request['company_image'];
            $fname = $file->getClientOriginalName();
            $imagenewname = uniqid($user_id).$user_id.$fname;
            $file->move(public_path('assets/img/employers/'),$imagenewname);
            $filepath = 'assets/img/employers/'.$imagenewname;
            $employer->company_image = $filepath;
        }

        $employer->save();

        return $this->successResponseEmployer("Update success",$employer);
    }

    public function destroy(string $id){

        $employer = Employer::findOrFail($id);
        $path = $employer->company_image;
        if(File::exists($path)){
            File::delete($path);
        }
        $employer->delete();
        return response()->json([
            "statusCode" => "200",
            "message" => "Success deleted"
        ]);
    }
}
