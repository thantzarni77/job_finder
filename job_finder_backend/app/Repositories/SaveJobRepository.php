<?php
namespace App\Repositories;

use App\Interfaces\SaveJobRepositoryInterface;
use App\Models\JobDetail;
use App\Models\Save_job;
use Tymon\JWTAuth\Facades\JWTAuth;

class SaveJobRepository implements SaveJobRepositoryInterface
{

    //create save job
    public function store(array $data)
    {
        $saveData = [
            'seeker_id'   => $data['seeker_id'],
            'post_job_id' => $data['post_job_id'],
        ];
        if(Save_job::where('seeker_id', $data['seeker_id'])->where('post_job_id', $data['post_job_id'])->exists()){
            return response()->json(['status' => 'error', 'message' => 'You have already saved this job.'], 400);
        }
        JobDetail::where('post_job_id', $data['post_job_id'])->increment('save_count');
        Save_job::create($saveData);

        return response()->json(['status' => 'success', 'message' => 'Save job successfully'], 201);
    }

    //view save job
    public function view()
    {
        $data = Save_job::where('seeker_id', JWTAuth::user()->id)->get();
        return response()->json(['status' => 'success', 'message' => 'Seeker Save job fetched successfully', 'data' => $data], 200);
    }

    //remove save job
    public function destroy($id)
    {
        $save = Save_job::find($id);
        // reduce save count
        JobDetail::where('post_job_id', $save['post_job_id'])->decrement('save_count');
        $save->delete();
        return response()->json(['status' => 'success', 'message' => 'Save job deleted successfully'], 200);
    }

    //check save job
    public function checkIsSaved($request)
    {
        $post_job_id = $request['post_job_id'];
        $seeker_id   = $request['seeker_id'];
        $checked     = Save_job::where("post_job_id", $post_job_id)->where('seeker_id', $seeker_id)->first();

        if ($checked) {
            return response()->json([
                "status" => true,
                "data"   => $checked,
            ], 200);
        } else {
            return response()->json([
                "status" => false,
            ], 200);
        }
    }
}
