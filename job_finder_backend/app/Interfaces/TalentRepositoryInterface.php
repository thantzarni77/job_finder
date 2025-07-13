<?php

namespace App\Interfaces;

interface TalentRepositoryInterface
{
    public function index();
    public function create(array $data);
    public function update(array $data, $id);
    public function destroy($id);
}
