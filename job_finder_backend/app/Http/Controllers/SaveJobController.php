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

    //save job list
    public function index(){
        return $this->saveJobRepositoryInterface->index();
    }
    //create save job
    public function store(Request $request){
        return $this->saveJobRepositoryInterface->store($request);
    }
    //view save job
    public function view(){
        return $this->saveJobRepositoryInterface->view();
    }

    //delete save job
    public function destroy($id){
        return $this->saveJobRepositoryInterface->destroy($id);
    }
}
