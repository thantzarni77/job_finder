<?php

namespace App\Http\Controllers;

use App\Interfaces\ApplyJobRepositoryInterface;
use Illuminate\Http\Request;

class ApplyJobController extends Controller
{
    //repository set up
    private ApplyJobRepositoryInterface $applyJobRepositoryInterface;
    public function __construct(ApplyJobRepositoryInterface $applyJobRepositoryInterface)
    {
        $this->applyJobRepositoryInterface = $applyJobRepositoryInterface;
    }
}
