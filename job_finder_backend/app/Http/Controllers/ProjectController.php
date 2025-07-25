<?php
namespace App\Http\Controllers;

use App\Interfaces\ProjectRepositoryInterface;
use App\Models\Project;
use App\Models\Seeker;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

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
            $data = $request->validate([
                'title'       => 'required|min:3|max:100',
                'description' => 'required|max:100',
                'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'link'        => 'max:100',
            ]);

            //image file store at public/image folder
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name  = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('image'), $name);
                $data['image'] = $name;
            }
            // $data['seeker_id']= $request->user()->id;
            $user      = JWTAuth::parseToken()->authenticate();
            $seeker_id = Seeker::where('user_id', $user->id)->value("id");

            $data['seeker_id'] = $seeker_id;
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
                'title'       => 'required|min:3|max:100',
                'description' => 'required|max:100',
                'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'link'        => 'max:100',
            ]);

            //image file store at public/image folder
            if ($request->hasFile('image')) {
                $oldImagePath = public_path('image/' . $project->image);
                if (file_exists($oldImagePath) && is_file($oldImagePath)) {
                    unlink($oldImagePath);
                }

                $image = $request->file('image');
                $name  = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('image'), $name);
                $data['image'] = $name;
            }
            // $data['seeker_id']= $request->user()->id;
            $data['seeker_id'] = 7;
            // dd($data);
            $project->update($data);
            return response()->json(['status' => 'success', 'message' => 'Project updated successfully', 'data' => $project], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        //remove existing image
        if ($project->image) {
            $imagePath = public_path('image/' . $project->image);
            if (file_exists($imagePath) && is_file($imagePath)) {
                unlink($imagePath);
            }
        }
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully!'], 200);
    }
}
