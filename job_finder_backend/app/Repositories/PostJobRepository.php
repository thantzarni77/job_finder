<?php
namespace App\Repositories;

use App\Helpers\Filters;
use App\Http\Requests\JobFilterRequest;
use App\Interfaces\PostJobRepositoryInterface;
// use Google\Service\Blogger\Post;
use App\Models\JobDetail;
use App\Models\PostJob;
use Illuminate\Http\Request;

class PostJobRepository implements PostJobRepositoryInterface
{
    protected $postJob;

    public function __construct(PostJob $postJob)
    {

        $this->postJob = $postJob;
    }

    public function index(Request $request, JobFilterRequest $jobFilterRequest)
    {

        if ($request->filled('job_code')) {
            $job = $this->postJob
                ->with(['jobDetail', 'category'])
                ->where('job_code', 'like', '%' . $request->job_code . '%')
                ->first();

            return response()->json([
                'status'  => 'success',
                'message' => 'Job fetched successfully job code ',
                'data'    => $job,
            ], 200);
        }
        $filter = new Filters($jobFilterRequest->validated());

        $jobs = $this->postJob
            ->with(['jobDetail', 'category'])
            ->filter($filter)
            ->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Jobs fetched successfully filter',
            'data'    => $jobs,
        ], 200);

    }

    public function store(array $data)
    {
        // dd($data['requirements']);
        //generate Job Code
        $jobCode                = "JF-" . rand(0000, 9999) . now()->format('ymd');
        $data['job_code']       = $jobCode;
        $data['posting_status'] = 'pending';
        $this->postJob->create($data);

        $PostJob = $this->postJob->where('job_code', $jobCode)->first();

        JobDetail::create([
            'post_job_id'  => $PostJob->id,
            'requirements' => $data['requirements'],
            'description'  => $data['description'],
            'deadline'    => $data['deadline'], //YYYY-MM-DD format
            'vacancy'      => $data['vacancy'],
            'note'         => $data['note'],
            'benefits'     => $data['benefits'],
            'gender'       => $data['gender'],
            'save_count'   => 0,
            'apply_count'  => 0,
        ]);

        $PostJob->save();
        $resData = [
            $data = $this->postJob->with('jobDetail')->where('job_code', $jobCode)->first(),
        ];
        return response()->json(['status' => 'success', 'message' => 'Job created successfully', 'data' => $resData], 201);
    }

    public function findOrFail($id)
    {
        $data = $this->postJob->with('jobDetail')->findOrFail($id);
        return response()->json(['status' => 'success', 'message' => 'Job fetched successfully', 'data' => $data], 200);
    }

    public function update(array $data, $id)
    {

        $job = $this->postJob->findOrFail($id);
        $job->update($data);

        $jobDetail = JobDetail::where('post_job_id', $job->id)->first();
        $jobDetail->update([
            'requirements' => $data['requirements'],
            'description'  => $data['description'],
            'deadline'    => $data['deadline'], //YYYY-MM-DD format
            'vacancy'      => $data['vacancy'],
            'note'         => $data['note'],
            'benefits'     => $data['benefits'],
            'gender'       => $data['gender'],
        ]);

        $job->save();
        $resData = [
            $data = $this->postJob->with('jobDetail')->where('job_code', $job->job_code)->first(),
        ];
        return response()->json(['status' => 'success', 'message' => 'Job updated successfully', 'data' => $resData], 200);
    }

    public function delete($id)
    {
        JobDetail::where('post_job_id', $id)->delete();
        $this->postJob->findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Job deleted successfully'], 200);
    }

}
