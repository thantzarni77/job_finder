<?php
namespace App\Repositories;

use App\Interfaces\ProjectRepositoryInterface;
use App\Models\Project;
use App\Models\Seeker;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProjectRepository implements ProjectRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    //current seeker's project
    public function index()
    {
        $seeker_id = Seeker::where('user_id', JWTAuth::user()->id)->value('id');
        $data      = Project::where('seeker_id', $seeker_id)->get();
        return response()->json(['status' => 'success', 'message' => 'Projects fetched successfully', 'data' => $data], 200);
    }
    //store project
    public function create(array $data)
    {
        $data = Project::create($data);
        return response()->json(['status' => 'success', 'message' => 'Project created successfully', 'data' => $data], 201);
    }

    //each seeker's project
    public function show($id)
    {
        $seeker_id = Seeker::where('user_id', $id)->value('id');
        $data      = Project::where('seeker_id', $seeker_id)->get();

        return response()->json(['status' => 'success', 'message' => 'Each Seeker Projects fetched successfully', 'data' => $data], 200);
    }

    //update
    public function update(array $data, $id)
    {
        $project           = Project::findOrFail($id);
        $data['seeker_id'] = $project->seeker_id;
        $project->update($data);
        return response()->json(['status' => 'success', 'message' => 'Project updated successfully', 'data' => $project], 201);
    }
}
