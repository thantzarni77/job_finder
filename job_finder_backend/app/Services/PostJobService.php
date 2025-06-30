<?php

namespace App\Services;

use App\Interfaces\PostJobRepositoryInterface;

class PostJobService
{
    protected $repository;

    public function __construct(PostJobRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllJobs()
    {
        return $this->repository->all();
    }

    public function createJob($data)
    {
        return $this->repository->store($data);
    }

    public function getJob($id)
    {
        return $this->repository->find($id);
    }

    public function updateJob($id, $data)
    {
        return $this->repository->update($id, $data);
    }

    public function deleteJob($id)
    {
        return $this->repository->delete($id);
    }
}
