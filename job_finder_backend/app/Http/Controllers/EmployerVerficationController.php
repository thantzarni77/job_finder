<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\EmployerVerificationInterface;
use Exception;

class EmployerVerficationController extends Controller
{
    private $employerVerficationInterface;

    public function __construct(EmployerVerificationInterface $employerVerficationInterface)
    {
        $this->employerVerficationInterface = $employerVerficationInterface;
    }
    public function updateStatus($id, Request $request)
    {

        $data = $request->validate([
            'status' => 'required',
        ]);
        return $this->employerVerficationInterface->updateStatus($id, $data);
    }
}
