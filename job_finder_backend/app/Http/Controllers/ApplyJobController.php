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
    public function applyJob(Request $request)
    {
        $applyData = $request->validate([
            'document' => 'required',
            'document.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5000',
            'message' => 'max:100',
            'expected_salary' => 'sometimes|numeric',
        ]);
        // dd($request->all());
        //handle multiple file
        if ($request->hasFile('document')) {
            $documents = [];
            foreach ($request->file('document') as $file) {
                $name = uniqid() . '_' . $file->getClientOriginalName();
                $image_path = $file->move(public_path('document'), $name);
                $documents[] = $name;
            }
            // dd($documents);
            $applyData['document'] = $documents;
        }
        // dd($request->all());

        return $this->applyJobRepositoryInterface->applyJob($applyData);
    }
    //get apply data
    public function applyJobData()
    {
        return $this->applyJobRepositoryInterface->applyJobData();
    }
    //make shortlist
    public function addShortList($id)
    {
        return $this->applyJobRepositoryInterface->addShortlist($id);
    }
    //view employer posted job
    public function employerPostedJobs()
    {
        return $this->applyJobRepositoryInterface->employerPostedJobs();
    }

    //seeker view his applied jobs
    public function seekerAppliedJobs()
    {
        return $this->applyJobRepositoryInterface->seekerAppliedJobs();
    }

    //employer view his shortlisted jobs
    public function employerShortlistJobs()
    {
        return $this->applyJobRepositoryInterface->employerShortlistJobs();
    }

    //mail send
    public function sendMail(Request $request)
    {
        return $this->applyJobRepositoryInterface->sendMail($request);
    }
}
