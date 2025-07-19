<?php

namespace App\Repositories;

use App\Models\Save_job;
use App\Interfaces\SaveJobRepositoryInterface;

class SaveJobRepository implements SaveJobRepositoryInterface
{
    //save job list
    public function index(){
        $data = Save_job::get();
        return response()->json(['status' => 'success', 'message' => 'Save job fetched successfully', 'data' => $data], 200);
    }

    //create save job
    public function store($request){
        $data = $request = [
            'seeker_id' => $request->seeker_id,
            'post_job_id' => $request->post_job_id
        ];
        Save_job::create($data);
        return response()->json(['status' => 'success', 'message' => 'Save job successfully'], 201);
    }

    //view save job
    public function view(){
        $data = Save_job::where('seeker_id',8)->get();
        return response()->json(['status' => 'success', 'message' => 'Seeker Save job fetched successfully', 'data' => $data], 200);
    }

    //remove save job
    public function destroy($id){
        Save_job::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Save job deleted successfully'], 200);
    }
}
