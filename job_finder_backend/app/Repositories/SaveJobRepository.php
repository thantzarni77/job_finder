<?php

namespace App\Repositories;

use App\Models\Save_job;
use App\Interfaces\SaveJobRepositoryInterface;

class SaveJobRepository implements SaveJobRepositoryInterface
{
    //save job list
    public function index(){
        return Save_job::get();
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
        return Save_job::where('seeker_id',auth()->user()->id)->get();
    }

    //remove save job
    public function destroy($id){
        return Save_job::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Save job deleted successfully'], 200);
    }
}
