<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\JobDetailRepositoryInterface;

class JobDetailController extends Controller
{
    protected $repo;

    public function __construct(JobDetailRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    //type api start
    public function types()
    {
        return response()->json($this->repo->jobType());
    }

    //role api start
    public function roles()
    {
        return $this->repo->jobRole();
    }

    public function genders()
    {
        return $this->repo->gender();
    }
}
