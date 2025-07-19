<?php

namespace App\Repositories;

use App\Models\Apply_job;
use App\Mail\ShortlistContactMail;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Interfaces\ApplyJobRepositoryInterface;

class ApplyJobRepository implements ApplyJobRepositoryInterface
{
    /**
     * Create a new class instance.
     */

    public function applyJobData(){
        //get data from database
        $data = Apply_job::get();
        return response()->json(['status' => 'success', 'message' => 'Apply job fetched successfully', 'data' => $data], 200);
    }
    //seeker apply a job
    public function applyJob(array $applyData)
    {


        $data = [
            'post_job_id' => 3,
            'employer_id' => 6,
            'seeker_id' => 7,
            'shortlist' => false,
            'document' => $applyData['document'],
            'message' => $applyData['message'],
            'expected_salary' => $applyData['expected_salary'],
        ];
        Apply_job::create($data);

        return response()->json(['status' => 'success', 'message' => 'Job applied successfully.Good luck for your interview.', 'data' => $data], 201);
    }

    //add to shortlist
    public function addShortlist($id){
        Apply_job::where('id', $id)->update(['shortlist' => true]);
        return response()->json(['status' => 'success', 'message' => 'Short List Added successfully'], 201);
    }

    //employer view his create job data
    public function employerPostedJobs(){

        $data = Apply_job::where('employer_id', auth()->user()->id)->get();
        if(!$data){
            return response()->json(['status' => 'success', 'message' => 'You have not posted any job postings yet.', 'data' => $data],400);
        }
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your posted job postings.', 'data' => $data], 200);
    }

    //seeeker view his applied jobs
    public function seekerAppliedJobs(){
        $data = Apply_job::where('seeker_id', 8)->get();
        if(!$data){
            return response()->json(['status' => 'success', 'message' => 'You have not applied any job postings yet.', 'data' => $data],400);
        }
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your applied job.', 'data' => $data], 200);
    }

    //emoyer view his shortlisted jobs
    public function employerShortlistJobs(){
        $data = Apply_job::where('employer_id', 6)->where('shortlist', true)->get();
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your shortlisted job postings.', 'data' => $data], 200);
    }

    //mail send to seeker
    public function sendMail($request){
        $validate = Validator::make($request->all(), [
            'seeker_id' => 'required',
            'message' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => $validate->errors()], 422);
        }

        Mail::to('zcoder71@gmail.com')->send(new ShortlistContactMail($validate));

        return response()->json(['status' => 'success', 'message' => 'You have successfully send mail to seeker.'], 200);
    }

    //get apply data
    private function applyData($request){
        return [
            'post_job_id' => $request->post_job_id,
            'seeker_id' => $request->seeker_id,
            'employer_id' => $request->employer_id,
            'message' => $request->message,
            'document' => $request->document,
            'expected_salary' => $request->expected_salary,
            'shortlist' => false
        ];
    }
}
