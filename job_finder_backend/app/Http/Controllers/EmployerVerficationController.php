<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\EmployerVerificationInterface;
use Exception;

class EmployerVerficationController extends Controller
{
    private EmployerVerificationInterface $employerVerficationInterface;
    public function __construct(EmployerVerificationInterface $employerVerficationInterface)
    {
        $this->employerVerficationInterface = $employerVerficationInterface;
    }
    public function updateStatus($id,Request $request){
        try{
            $employer = $this->employerVerficationInterface->updateStatus($request->status,$id);
        return response()->json([
            'employer' => $employer,
            'message' => 'Updated verification successfully'], 200);
        }catch(Exception $e){
            return response()->json([
                'error' => 'Something\'s went wrong',
                'message' => $e->getMessage()
            ],500);
        }
    }
}
