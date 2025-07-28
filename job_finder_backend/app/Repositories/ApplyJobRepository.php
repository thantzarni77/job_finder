<?php
namespace App\Repositories;

use App\Models\Seeker;
use App\Models\Employer;
use App\Models\Apply_job;
use App\Models\JobDetail;
use App\Mail\ShortlistContactMail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Interfaces\ApplyJobRepositoryInterface;

class ApplyJobRepository implements ApplyJobRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    //applyJobData
    public function applyJobData(int $id){
        $employerId = Employer::where('employer_id', JWTAuth::user()->id)->value('id');
        $data = Apply_job::where('employer_id', $employerId)->where('post_job_id',$id)->get();
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your job postings.', 'data' => $data], 200);
    }

    //seeker apply a job
    public function applyJob(array $applyData)
    {
        $data = [
            'post_job_id'     => $applyData['post_job_id'],
            'employer_id'     => $applyData['employer_id'],
            'seeker_id'       => $applyData['seeker_id'],
            'shortlist'       => false,
            'document'        => $applyData['document'],
            'message'         => $applyData['message'],
            'expected_salary' => $applyData['expected_salary'],
        ];
        //if seeker already applied for this job then do not count again
        if (Apply_job::where('post_job_id', $applyData['post_job_id'])->where('seeker_id', $applyData['seeker_id'])->exists()) {
            return response()->json(['status' => 'success', 'message' => 'You have already applied for this job.'], 400);
        }
        //increment apply count
        JobDetail::where('post_job_id', $applyData['post_job_id'])->increment('apply_count');
        Apply_job::create($data);
        return response()->json(['status' => 'success', 'message' => 'Job applied successfully.Good luck for your interview.', 'data' => $data], 201);
    }

    //add to shortlist
    public function addShortlist($id)
    {
        Apply_job::where('id', $id)->update(['shortlist' => true]);
        return response()->json(['status' => 'success', 'message' => 'Short List Added successfully'], 200);
    }

    //employer view his create job data
    public function employerPostedJobs()
    {

        $data = Apply_job::where('employer_id', JWTAuth::user()->id)->get();
        if (! $data) {
            return response()->json(['status' => 'success', 'message' => 'You have not posted any job postings yet.', 'data' => $data], 400);
        }
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your posted job postings.', 'data' => $data], 200);
    }

    //seeeker view his applied jobs
    public function seekerAppliedJobs()
    {
        $seeker_id = Seeker::where("user_id", JWTAuth::user()->id)->value('id');
        $data      = Apply_job::where('seeker_id', $seeker_id)->get();
        if (! $data) {
            return response()->json(['status' => 'success', 'message' => 'You have not applied any job postings yet.', 'data' => $data], 400);
        }
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your applied job.', 'data' => $data], 200);
    }

    //emoyer view his shortlisted jobs
    public function employerShortlistJobs()
    {
        $data = Apply_job::where('employer_id', JWTAuth::user()->id)->where('shortlist', true)->get();
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch your shortlisted job postings.', 'data' => $data], 200);
    }

    //mail send to seeker
    public function sendMail($request)
    {
        $validate = Validator::make($request->all(), [
            'seeker_id' => 'required',
            'message'   => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => $validate->errors()], 422);
        }

        Mail::to('thantzarni83@gmail.com')->send(new ShortlistContactMail($validate));

        return response()->json(['status' => 'success', 'message' => 'You have successfully send mail to seeker.'], 200);
    }

    //remove post
    public function destroy($id){
        $data = Apply_job::find($id);
        JobDetail::where('post_job_id', $data['post_job_id'])->decrement('apply_count');
        $data->delete();
        return response()->json(['status' => 'success', 'message' => 'You have successfully remove job postings.'], 200);
    }
}
