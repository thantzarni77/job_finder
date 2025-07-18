<?php

namespace App\Repositories;

use App\Models\PostJob;
use App\Interfaces\PostJobRepositoryInterface;

class PostJobRepository implements PostJobRepositoryInterface
{
    public function all()
    {
        return PostJob::all();
    }

    public function store(array $data)
    {
        return PostJob::create($data);
    }

    public function find($id)
    {
        return PostJob::find($id);
    }

    public function update($id, array $data)
    {
        $job = PostJob::find($id);
        if ($job) {
            $job->update($data);
        }
        return $job;
    }

    public function delete($id)
    {
        $job = PostJob::find($id);
        if ($job) {
            $job->delete();
        }
        return $job;
    }
}
