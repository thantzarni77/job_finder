<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface ProjectRepositoryInterface
{
    public function index();
    public function create(array $data);
    public function show($id);
    public function update(array $data, $id);
}
