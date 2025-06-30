<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface EmployerVerificationInterface
{
    public function updateStatus(int $id,string $status);
}
