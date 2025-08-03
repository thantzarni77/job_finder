<?php

namespace App\Http\Controllers;

use App\Interfaces\ContactRepositoryInterface;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    private $contactRepo;
    public function __construct(ContactRepositoryInterface $contactRepo)
    {
        $this->contactRepo = $contactRepo;
    }

    public function getContacts()
    {
        return $this->contactRepo->getContacts();
    }
    public function sendContact(Request $request)
    {
        return $this->contactRepo->sendContact(($request));
    }
}
