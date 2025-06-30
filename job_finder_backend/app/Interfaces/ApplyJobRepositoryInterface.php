<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface ApplyJobRepositoryInterface
{
    public function applyJob(Request $request);
    public function applyJobData();
    public function addShortlist($id);
    public function employerPostedJobs();
    public function seekerAppliedJobs();
    public function employerShortlistJobs();
    public function sendMail(Request $request);
}
