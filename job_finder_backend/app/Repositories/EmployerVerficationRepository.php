<?php
namespace App\Repositories;

use App\Models\Employer;
use Illuminate\Http\Request;
use App\Interfaces\EmployerVerificationInterface;

class EmployerVerficationRepository implements EmployerVerificationInterface
{
    public function updateStatus(int $id,string $status){
        $employer = Employer::findOrFail($id);
        $employer->verification = $status;
        $employer->save();
        return $employer;
    }
}
