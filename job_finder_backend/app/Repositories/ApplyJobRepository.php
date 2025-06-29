<?php

namespace App\Repositories;

use App\Models\Apply_job;
use Illuminate\Support\Facades\Validator;
use App\Interfaces\ApplyJobRepositoryInterface;

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

    public function addShportlist($id){
        Apply_job::where('id', $id)->update(['shortlist' => true]);
        return response()->json(['status' => 'success', 'message' => 'Short List Addes successfully'], 201);
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
