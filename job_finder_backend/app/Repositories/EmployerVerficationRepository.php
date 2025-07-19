<?php
namespace App\Repositories;

use App\Models\Employer;
use Illuminate\Http\Request;
use App\Interfaces\EmployerVerificationInterface;

class EmployerVerficationRepository implements EmployerVerificationInterface
{
    public function updateStatus(int $id,array $data){
        $verifyEmployer  = Employer::findOrFail($id)->update(['verification' => $data['status']]);
        return response()->json([
            'data' => $verifyEmployer,
            'message' => 'Updated verification successfully'
        ], 200);
    }
}
