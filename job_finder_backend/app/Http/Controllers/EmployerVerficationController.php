<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\EmployerVerificationInterface;

class EmployerVerficationController extends Controller
{
    private EmployerVerificationInterface $employerVerficationInterface;
    public function __construct(EmployerVerificationInterface $employerVerficationInterface)
    {
        $this->employerVerficationInterface = $employerVerficationInterface;
    }
    public function updateStatus($id,Request $request){
        $employer = $this->employerVerficationInterface->updateStatus($request->status,$id);
        return response()->json([
            'employer' => $employer,
            'message' => 'Updated verification successfully'], 201);
    }
}
