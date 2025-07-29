<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function toArray()
    {
        $attributes = parent::toArray();
        if (array_key_exists('deadline', $attributes)) {
            $attributes['deadline'] = Carbon::parse($attributes['deadline'])->toDateString();
        }
        return $attributes;
    }

    public function postJob()
    {
        return $this->belongsTo(PostJob::class);
    }
}
