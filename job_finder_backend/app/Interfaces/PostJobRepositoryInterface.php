<?php

namespace App\Interfaces;
use Illuminate\Http\Request;
interface PostJobRepositoryInterface
{
    public function index();
    public function store(array $data);
    public function findOrFail($id);
    public function update(array $data, $id);
    public function delete($id);
}
