<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobFilterRequest;
use App\Http\Requests\Postjob\CreateRequest;
use App\Http\Requests\Postjob\UpdateRequest;
use App\Interfaces\PostJobRepositoryInterface;
use App\Models\PostJob;
use Illuminate\Http\Request;

class PostJobController extends Controller
{
    protected $postJobRepository;

    public function __construct(PostJobRepositoryInterface $postJobRepository)
    {
        $this->postJobRepository = $postJobRepository;
    }

    public function getAllPosts()
    {
        return $this->postJobRepository->getAllPosts();
    }

    public function index(Request $request, JobFilterRequest $jobFilterRequest)
    {
        return $this->postJobRepository->index($request, $jobFilterRequest);
    }

    public function store(CreateRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        return $this->postJobRepository->store($data);
    }

    public function show($id)
    {
        return $this->postJobRepository->findOrFail($id);
    }

    public function update(UpdateRequest $request, $id)
    {
        $data = $request->validated();

        if (! $this->postJobRepository->findOrFail($id)) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return $this->postJobRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->postJobRepository->delete($id);
    }

    public function postVerification(Request $request, $id)
    {
        $status = $request->all();
        return $this->postJobRepository->postVerification($status, $id);
    }
}
