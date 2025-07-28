<?php
namespace App\Http\Controllers;

use App\Interfaces\SaveJobRepositoryInterface;
use Illuminate\Http\Request;

class SaveJobController extends Controller
{
    //save job repository set up
    private SaveJobRepositoryInterface $saveJobRepositoryInterface;

    public function __construct(SaveJobRepositoryInterface $saveJobRepositoryInterface)
    {
        $this->saveJobRepositoryInterface = $saveJobRepositoryInterface;
    }

    //create save job
    public function store(Request $request)
    {
        return $this->saveJobRepositoryInterface->store($request);
    }
    //view save job
    public function view()
    {
        return $this->saveJobRepositoryInterface->view();
    }

    //delete save job
    public function destroy($id)
    {
        return $this->saveJobRepositoryInterface->destroy($id);
    }

    //check save job
    public function checkIsSaved(Request $request)
    {
        return $this->saveJobRepositoryInterface->checkIsSaved($request);
    }
}
