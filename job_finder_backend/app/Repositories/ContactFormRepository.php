<?php
namespace App\Repositories;
use App\Models\Contact;
use Illuminate\Http\Client\Request;
use App\Interfaces\ContactFormInterface;

class ContactFormRepository implements ContactFormInterface
{
    public function index(){
        return Contact::all();
    }
    public function store(array $data){
        return Contact::create($data);
    }
    public function destroy($id){
        $mail = Contact::find($id);
        if ($mail) {
            $mail->delete();
        }
        return $mail;
    }
}
