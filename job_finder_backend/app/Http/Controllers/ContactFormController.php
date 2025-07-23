<?php

namespace App\Http\Controllers;

use App\Interfaces\ContactFormInterface;
use Illuminate\Http\Request;

class ContactFormController extends Controller
{
    private $contactFormInterface;
    public function __construct(ContactFormInterface $contactFormInterface)
    {
        $this->contactFormInterface = $contactFormInterface;
    }
    public function getAllMail(){
        return response()->json(['success' => true, 'data' => $this->contactFormInterface->index()]);
    }
    public function storeMail(Request $request){
        $data = $request->validate([
            'title' => 'required',
            'message' => 'required',
        ]);
        $data = $this->contactFormInterface->store($data);
        return response()->json([
            'data' => $data
        ],201);
    }
    public function deleteMail($id){
        $mail = $this->contactFormInterface->destroy($id);
        if (!$mail) {
            return response()->json(['error' => 'Mail not found'], 404);
        }

        return response()->json(['success' => true, 'message' => 'Deleted successfully']);
    }

}
