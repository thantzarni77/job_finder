<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Postjob\CreateRequest;
use App\Http\Requests\Postjob\UpdateRequest;
use App\Interfaces\PostJobRepositoryInterface;
use App\Helpers\Filters;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Services\PostJobService;

use App\Http\Requests\JobFilterRequest;
use App\Models\PostJob;

class PostJobController extends Controller
{
    protected $postJobRepository;

    public function __construct(PostJobRepositoryInterface $postJobRepository)
    {
        $this->postJobRepository = $postJobRepository;
    }

    public function index()
    {
        return $this->postJobRepository->index();
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

        if (!$this->postJobRepository->findOrFail($id)) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return $this->postJobRepository->update($data, $id);
    }

    public function destroy($id)
    {
        return $this->postJobRepository->delete($id);
    }

    public function filter(JobFilterRequest $request){
        $filter = new Filters($request->validated());
        $jobs = PostJob::filter($filter)->get();
        return response()->json(['success' => true, 'data' => $jobs]);
    }
}

?>
