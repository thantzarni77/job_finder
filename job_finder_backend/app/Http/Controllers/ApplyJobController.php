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
        logger($request->file('document'));
        $applyData = $request->validate([
            'post_job_id'     => "required",
            'employer_id'     => "required",
            'seeker_id'       => "required",
            'document'        => 'required',
            'document.*'      => 'image|mimes:jpeg,png,jpg,gif,svg|max:5000',
            'message'         => 'max:100',
            'expected_salary' => 'required',
        ]);
        //handle multiple file
        if ($request->hasFile('document')) {
            $documents = [];
            foreach ($request->file('document') as $file) {
                $name        = uniqid() . '_' . $file->getClientOriginalName();
                $image_path  = $file->move(public_path('document'), $name);
                $documents[] = $name;
            }
            $applyData['document'] = $documents;
        }
        return $this->applyJobRepositoryInterface->applyJob($applyData);
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
