<?php

namespace App\Repositories;

use App\Models\Role;
use App\Models\Type;
use App\Models\Job_detail;
use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\JobDetailRepositoryInterface;

class JobDetailRepository implements JobDetailRepositoryInterface
{
    protected $model;

    public function __construct(Job_detail $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $record = $this->find($id);
        $record->update($data);
        return $record;
    }

    public function delete(int $id): bool
    {
        return $this->find($id)->delete();
    }

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
}
