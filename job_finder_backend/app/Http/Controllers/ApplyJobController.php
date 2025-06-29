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
        return $this->applyJobRepositoryInterface->addShportlist($id);
    }
    //view employer posted job
    public function employerPostedJobs($id){
        return $this->applyJobRepositoryInterface->employerPostedJobs($id);
    }

    //seeker view his applied jobs
    public function seekerAppliedJobs($id){
        return $this->applyJobRepositoryInterface->seekerAppliedJobs($id);
    }

    //employer view his shortlisted jobs
    public function employerShortlistJobs($id){
        return $this->applyJobRepositoryInterface->employerShortlistJobs($id);
    }

    //mail send
    public function sendMail(Request $request){
        return $this->applyJobRepositoryInterface->sendMail($request);
    }
}
