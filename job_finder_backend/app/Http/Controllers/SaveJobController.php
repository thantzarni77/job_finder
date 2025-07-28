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
        $data = $request->all();
        return $this->saveJobRepositoryInterface->store($data);
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
    public function checkSaveJob(Request $request)
    {
        return $this->saveJobRepositoryInterface->checkSaveJob($request);
    }
}
