<?php

namespace App\Repositories;

use App\Models\Apply_job;
use App\Mail\ShortlistContactMail;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Validator;
use App\Interfaces\ApplyJobRepositoryInterface;
use Illuminate\Support\Facades\Mail;

class ApplyJobRepository implements ApplyJobRepositoryInterface
{
    /**
     * Create a new class instance.
     */

    public function applyJobData(){
        //get data from database
        return Apply_job::get();
    }
    public function applyJob($request)
    {
        $validator = Validator::make($request->all(), [
                'document' => 'required|max:5000',
                'message' => 'max:200',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }

        $data = $this->applyData($request);

        // Handle multiple file upload (CV,resume)
        if($request->hasFile('document')){
            $document = [];
            foreach($request->file('document') as $file){
                $name = uniqid().'_' . $file->getClientOriginalName();
                $file->move(public_path('document'), $name);
                array_push($document, $name);
            }

            $data['document'] = json_encode($document);
        }

        Apply_job::create($data);

        return response()->json(['status' => 'success', 'message' => 'Apply job successfully'], 201);
    }

    //add to shortlist
    public function addShportlist($id){
        Apply_job::where('id', $id)->update(['shortlist' => true]);
        return response()->json(['status' => 'success', 'message' => 'Short List Addes successfully'], 201);
    }

    //employer view his create job data
    public function employerPostedJobs($id){
        $data = Apply_job::where('employer_id', $id)->get();
        return $data;
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your posted job postings.'], 200);
    }

    //seeeker view his applied jobs
    public function seekerAppliedJobs($id){
        $data = Apply_job::where('seeker_id', $id)->get();
        return $data;
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your applied job.'], 200);
    }

    //emoyer view his shortlisted jobs
    public function employerShortlistJobs($id){
        $data = Apply_job::where('employer_id', $id)->where('shortlist', true)->get();
        return $data;
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your shortlisted job postings.'], 200);
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
