<?php
namespace App\Repositories;

use App\Interfaces\SaveJobRepositoryInterface;
use App\Models\Save_job;
use Tymon\JWTAuth\Facades\JWTAuth;

class SaveJobRepository implements SaveJobRepositoryInterface
{

    //create save job
    public function store($request)
    {
        $data = $request = [
            'seeker_id'   => $request->seeker_id,
            'post_job_id' => $request->post_job_id,
        ];
        Save_job::create($data);
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
        Save_job::findOrFail($id)->delete();
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
