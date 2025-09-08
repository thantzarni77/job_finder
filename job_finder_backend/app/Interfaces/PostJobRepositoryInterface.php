<?php
namespace App\Interfaces;

use App\Http\Requests\JobFilterRequest;
use Illuminate\Http\Request;

interface PostJobRepositoryInterface
{
    public function getAllPosts();
    public function index(Request $request, JobFilterRequest $JobFilterrequest);
    public function store(array $data);
    public function findOrFail($id);
    public function update(array $data, $id);
    public function delete($id);
    public function postVerification(array $data, $id);
}
