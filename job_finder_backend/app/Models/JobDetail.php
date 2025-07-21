<?php

namespace App\Models;

use App\Models\PostJob;
use Illuminate\Database\Eloquent\Model;

class JobDetail extends Model
{
    protected $fillable = [
        'post_job_id',
        'requirements',
        'description',
        'deadline',
        'vacancy',
        'note',
        'benefits',
        'gender',
        'save_count',
        'apply_count',
    ];

    public function postJob()
    {
        return $this->belongsTo(PostJob::class);
    }
}
