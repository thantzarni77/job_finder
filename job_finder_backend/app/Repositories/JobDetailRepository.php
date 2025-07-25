<?php

namespace App\Repositories;

use App\Models\Role;
use App\Models\Type;
use App\Models\Gender;
use App\Models\Job_detail;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\JobDetailRepositoryInterface;

class JobDetailRepository implements JobDetailRepositoryInterface
{

    //type
    public function jobType()
    {
        $data = Type::get(['id','name']);
        return response()->json(['status' => 'success', 'message' => 'Job type fetched successfully', 'data' => $data], 200);
    }

    //role
    public function jobRole()
    {
        $data = Role::get(['id','name']);
        return response()->json(['status' => 'success', 'message' => 'Job role fetched successfully', 'data' => $data], 200);
    }

    public function gender()
    {
        $gender = Gender::get(['id','type']);
        return response()->json(['status' => 'success', 'message' => 'Gender fetched successfully', 'data' => $gender], 200);
    }
}
