<?php

namespace App\Models;

use App\Models\JobDetail;
use Illuminate\Database\Eloquent\Model;

class PostJob extends Model
{
    protected $table = 'post_jobs';

    protected $fillable = [
        'employer_id',
        'category_id',
        'job_title',
        'salary',
        'role',
        'posting_status',
        'location',
        'type',
        'job_code',
        'view_count'
    ];

    public function jobDetail()
    {
        return $this->hasOne(JobDetail::class, 'post_job_id', 'id');
    }
}
