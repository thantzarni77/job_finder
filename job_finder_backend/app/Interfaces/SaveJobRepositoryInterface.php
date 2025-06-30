<?php

namespace App\Interfaces;

use Faker\Calculator\Ean;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use PhpParser\ErrorHandler\Collecting;

interface SaveJobRepositoryInterface
{
    public function index();
    public function store(Request $request);
    public function view($id);
    public function destroy($id);
}
