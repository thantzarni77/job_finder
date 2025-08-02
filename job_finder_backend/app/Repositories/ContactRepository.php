<?php

namespace App\Repositories;

use App\Interfaces\ContactRepositoryInterface;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactRepository implements ContactRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    protected $contact;
    public function __construct()
    {
        $this->contact = new Contact();
    }
    public function getContacts()
    {
        $allContacts = $this->contact->with("user")->get();

        return response()->json([
            "success" => "fetched successfully",
            "data" => $allContacts
        ], 200);
    }

    public function sendContact($request)
    {
        $validateData = $request->validate([
            'user_id' => "required",
            'title' => "required",
            'message' => "required",
        ]);

        Contact::create($validateData);

        return response()->json([
            'success' => 'contact created successfully'
        ]);
    }
}
