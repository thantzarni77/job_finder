<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface ApplyJobRepositoryInterface
{
    public function applyJobData(int $id);
    public function applyJob(array $applyData);
    public function addShortlist($id);
    public function employerPostedJobs();
    public function seekerAppliedJobs();
    public function employerShortlistJobs();
    public function sendMail(Request $request);
    public function destroy($id);
}
