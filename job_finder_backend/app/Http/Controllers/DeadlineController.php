<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeadlineController extends Controller
{
    //
    public function alertNearDeadline()
    {
        $alertDate = now()->addDays(7)->toDateString();

        $jobs = DB::table('job_details')
            ->join('post_jobs', 'job_details.post_job_id', '=', 'post_jobs.id')
            ->join('employers', 'post_jobs.employer_id', '=', 'employers.id')
            ->whereDate('job_details.deadline', $alertDate)
            ->select(
                'post_jobs.job_title',
                'job_details.deadline',
                'employers.company_name',
                'employers.company_email'
            )
            ->get();

        $alerts = [];

        foreach ($jobs as $job) {
            $alerts[] = [
                'job_title' => $job->job_title,
                'deadline' => $job->deadline,
                'message' => "Your job '{$job->job_title}' will expire in 7 days on {$job->deadline}."
            ];
        }

        if (empty($alerts)) {
            return response()->json(['message' => 'Job deadlines within 7 days.']);
        }

        return response()->json(['alerts' => $alerts]);
    }
}
