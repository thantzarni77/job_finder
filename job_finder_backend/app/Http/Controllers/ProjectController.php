<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Interfaces\ProjectRepositoryInterface;

class ProjectController extends Controller
{
    protected $projectRepo;

    public function __construct(ProjectRepositoryInterface $projectRepo)
    {
        $this->projectRepo = $projectRepo;
    }

    //index
    public function index()
    {
        return $this->projectRepo->index();
    }

    //store project
    public function store(Request $request)
    {
        try {
            dd($request->all());
            $data = $request->validate([
                'title' => 'required|min:3|max:100',
                'description' => 'required|max:100',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'link' => 'max:100',
            ]);

            //image file store at public/image folder
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('image'), $name);
                $data['image'] = $name;
            }
            $data['seeker_id'] = 7;
            return $this->projectRepo->create($data);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    //show
    public function show($id)
    {
        return $this->projectRepo->show($id);
    }

    //update
    public function update(Request $request, $id)
    {
        try {
            // dd($id ,'jjejeje');
            $project = Project::findOrFail($id);
            // dd($request->all());
            $data = $request->validate([
                'title' => 'required|min:3|max:100',
                'description' => 'required|max:100',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'link' => 'max:100',
            ]);

            if ($request->hasFile('image')) {
                if (file_exists(public_path('image/' . $project->image))) {
                    unlink(public_path('image/' . $project->image));
                }

                $image = $request->file('image');
                $name = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('image'), $name);
                $data['image'] = $name;
            }
            $data['seeker_id']= 3;
            $project->update($data);
            return response()->json(['status' => 'success', 'message' => 'Project updated successfully', 'data' => $project], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }



    public function destory($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully!'], 200);
    }
}
