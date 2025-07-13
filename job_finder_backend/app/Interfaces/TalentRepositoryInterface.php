<?php

namespace App\Interfaces;

interface TalentRepositoryInterface
{
    public function index();
    public function create(array $data);
    public function show($id);
    public function update(array $data, $id);
}
