<?php

namespace App\Interfaces;

use Illuminate\Http\Client\Request;

interface ContactFormInterface
{
    public function index();
    public function store(array $data);
    public function destroy($id);
}
