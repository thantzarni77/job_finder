<?php

namespace App\Repositories;

use App\Models\Contact;
use App\Models\Employer;
use Illuminate\Http\Request;
use App\Interfaces\EmployerVerificationInterface;

class EmployerVerficationRepository implements EmployerVerificationInterface
{
    public function updateStatus(int $id, array $data)
    {
        $verifyEmployer  = Employer::findOrFail($id)->update(['verification' => $data['status']]);

        $userID = Employer::where('id', $id)->value('user_id');

        Contact::where("user_id", $userID)->delete();

        return response()->json([
            'data' => $verifyEmployer,
            'message' => 'Updated verification successfully'
        ], 200);
    }
}
