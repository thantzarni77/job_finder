<?php

namespace App\Http\Controllers;

use App\Interfaces\TalentRepositoryInterface;
use Illuminate\Http\Request;

class TalentController extends Controller
{
    protected $talentRepo;

    public function __construct(TalentRepositoryInterface $talentRepo)
    {
        $this->talentRepo = $talentRepo;
    }
}
