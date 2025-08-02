<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface ContactRepositoryInterface
{
    public function getContacts();
    public function sendContact(Request $request);
}
