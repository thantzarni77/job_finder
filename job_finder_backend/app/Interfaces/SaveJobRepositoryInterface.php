<?php
namespace App\Interfaces;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

interface SaveJobRepositoryInterface
{
    public function store(array $data);
    public function view();
    public function destroy($id);
    public function checkSaveJob(Request $request);
}
