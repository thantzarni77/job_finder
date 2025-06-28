<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface JobDetailRepositoryInterface
{
    public function all(): Collection;
    public function find(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id): bool;
}



