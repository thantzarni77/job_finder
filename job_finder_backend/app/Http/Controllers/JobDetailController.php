<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\JobDetailRepositoryInterface;

class JobDetailController extends Controller
{
    protected $repo;

    public function __construct(JobDetailRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        return response()->json($this->repo->all());
    }

    public function show($id)
    {
        return response()->json($this->repo->find($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'post_job_id' => 'required|exists:post_jobs,id',
            'job_requirements' => 'required|string',
            'job_description' => 'required|string',
            'dead_line' => 'required|date',
            'vacancy' => 'required|integer',
            'note' => 'nullable|string',
            'benefits' => 'nullable|string',
            'gender' => 'nullable|in:male,female,both',
            'save_count' => 'nullable|integer',
            'apply_count' => 'nullable|integer',
            'job_benefits' => 'nullable|string',
        ]);

        $jobDetail = $this->repo->create($data);

        return response()->json([
            'success' => true,
            'message' => 'JobDetails created successfully',
            'data' => $jobDetail
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'post_job_id' => 'sometimes|exists:post_jobs,id',
            'job_requirements' => 'sometimes|string',
            'job_description' => 'sometimes|string',
            'dead_line' => 'sometimes|date',
            'vacancy' => 'sometimes|integer',
            'note' => 'nullable|string',
            'benefits' => 'nullable|string',
            'gender' => 'nullable|in:male,female,both',
            'save_count' => 'nullable|integer',
            'apply_count' => 'nullable|integer',
            'job_benefits' => 'nullable|string',
        ]);

        $jobDetailUpdate = $this->repo->update($id, $data);
        return response()->json([
            'success' => true,
            'message' => 'JobDetails updated successfully',
            'data' => $jobDetailUpdate
        ]);
    }

    public function destroy($id)
    {
        $deletedJobDetail = $this->repo->delete($id);
       return response()->json([
            'success' => true,
            'message' => 'JobDetails deleted successfully',
            // 'data' => $deletedJobDetail
        ]);
    }
}
