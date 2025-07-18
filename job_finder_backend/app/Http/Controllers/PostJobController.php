<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PostJobService;
use Illuminate\Validation\Rule;

class PostJobController extends Controller
{
    protected $service;

    public function __construct(PostJobService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return response()->json(['success' => true, 'data' => $this->service->getAllJobs()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'employer_id' => 'required|integer',
            'category_id' => 'required|integer',
            'job_title' => 'required|string|max:255',
            'salary' => 'nullable|string',
            'role' => 'nullable|in:junior,mid-level,senior',
            'posting_status' => 'nullable|in:pending,rejected,approved',
            'location' => 'required|string',
            'type' => 'nullable|in:full-time,part-time,contract,internship,freelance,volunteer,hybrid,project-based,remote,other',
            'job_code' => 'required|string|unique:post_jobs,job_code'
        ]);

        $job = $this->service->createJob($data);

        return response()->json([
            'success' => true,
            'data' => $job
        ], 201);
    }


    public function show($id)
    {
        $job = $this->service->getJob($id);
        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $job]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'employer_id' => 'sometimes|integer',
            'category_id' => 'sometimes|integer',
            'job_title' => 'sometimes|string|max:255',
            'salary' => 'nullable|string',
            'role' => ['nullable', Rule::in(['junior', 'mid-level', 'senior'])],
            'posting_status' => ['nullable', Rule::in(['pending', 'rejected', 'approved'])],
            'location' => 'sometimes|string',
            'type' => ['nullable', Rule::in([
                'full-time',
                'part-time',
                'contract',
                'internship',
                'freelance',
                'volunteer',
                'hybrid',
                'project-based',
                'remote',
                'other'
            ])],
            'job_code' => 'sometimes|string|unique:post_jobs,job_code,' . $id,
        ]);

        $job = $this->service->updateJob($id, $data);
        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $job]);
    }

    public function destroy($id)
    {
        $job = $this->service->deleteJob($id);
        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return response()->json(['success' => true, 'message' => 'Deleted successfully']);
    }
}
