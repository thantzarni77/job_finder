<?php

namespace App\Repositories;

use App\Models\Job_detail;
use App\Interfaces\JobDetailRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

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
}
