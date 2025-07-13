<?php

namespace App\Http\Controllers;

use App\Models\Talent;
use Illuminate\Http\Request;
use App\Interfaces\TalentRepositoryInterface;

class TalentController extends Controller
{
    protected $talentRepo;

    public function __construct(TalentRepositoryInterface $talentRepo)
    {
        $this->talentRepo = $talentRepo;
    }

    public function index()
    {
        return $this->talentRepo->index();
    }
    public function create(Request $request,$id)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);
        return $this->talentRepo->create($data,$id);
    }

    public function update(Request $request,$id)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);
        return $this->talentRepo->update($data,$id);
    }

    public function destroy($id)
    {
        $talent = Talent::FindOrFail($id);
        return $talent->$this->talentRepo->delete();
    }

}
