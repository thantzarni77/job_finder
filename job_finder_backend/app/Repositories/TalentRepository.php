<?php

namespace App\Repositories;

use App\Models\Talent;
use App\Interfaces\TalentRepositoryInterface;

class TalentRepository implements TalentRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function index()
    {
        $data = Talent::all();
        return response()->json([
            'data' => $data,
            'message' => 'Talents fetched successfully'
        ],200);
    }

    public function create(array $data)
    {
        $data = Talent::create();
        return response()->json([
            'data' => $data,
            'message' => 'Talents created successfully'
        ],200);
    }

    public function update(array $data,$id)
    {
        $talent = Talent::FindOrFail($id);
        $data['id'] = $talent->id;
        $talent->update($data);
        return response()->json([
            'data' => $data,
            'message' => 'Talents updated successfully'
        ],200);
    }

    public function destroy($id)
    {
        $data = Talent::FindOrFail($id)->delete();
        return response()->json([
            'data' => $data,
            'message' => 'Talent delete successfully'
        ],200);
    }

}
