<?php
namespace App\Interfaces;

use Illuminate\Http\Request;

interface SaveJobRepositoryInterface
{
    public function store(Request $request);
    public function view();
    public function destroy($id);
    public function checkSaveJob(Request $request);
}
