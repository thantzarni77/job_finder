<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\ProjectRepositoryInterface;

class ProjectRepository implements ProjectRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    //index
    public function index()
    {
        $data = Project::where('seeker_id', 7)->get();
        return response()->json(['status' => 'success', 'message' => 'Projects fetched successfully', 'data' => $data], 200);
    }
    //store project
    public function create(array $data)
    {
        $data = Project::create($data);
        return response()->json(['status' => 'success', 'message' => 'Project created successfully', 'data' => $data], 201);
    }

    //show
    public function show($id)
    {
        $data = Project::findOrFail($id);
        return response()->json(['status' => 'success', 'message' => 'Project Detail fetched successfully', 'data' => $data], 200);
    }

    //update
    public function update(array $data, $id)
    {
        $project = Project::findOrFail($id);
        $data['seeker_id'] = $project->seeker_id;
        $project->update($data);
        return response()->json(['status' => 'success', 'message' => 'Project updated successfully', 'data' => $project], 200);
    }
}
