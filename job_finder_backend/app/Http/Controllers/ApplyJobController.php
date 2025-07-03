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
    //create apply job
    public function applyJob(Request $request){
            return $this->applyJobRepositoryInterface->applyJob($request);
        }
    //get apply data
    public function applyJobData(){
        return $this->applyJobRepositoryInterface->applyJobData();
    }
    //make shortlist
    public function addShortList($id){
        return $this->applyJobRepositoryInterface->addShortlist($id);
    }
    //view employer posted job
    public function employerPostedJobs(){
        return $this->applyJobRepositoryInterface->employerPostedJobs();
    }

    //seeker view his applied jobs
    public function seekerAppliedJobs(){
        return $this->applyJobRepositoryInterface->seekerAppliedJobs();
    }

    //employer view his shortlisted jobs
    public function employerShortlistJobs(){
        return $this->applyJobRepositoryInterface->employerShortlistJobs();
    }

    //mail send
    public function sendMail(Request $request){
        return $this->applyJobRepositoryInterface->sendMail($request);
    }
}
