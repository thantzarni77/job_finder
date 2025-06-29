<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job_detail extends Model
{
    protected $fillable = [
        'post_job_id',
        'job_requirements',
        'job_description',
        'dead_line',
        'vacancy',
        'note',
        'benefits',
        'gender',
        'save_count',
        'apply_count',
        'job_benefits',
    ];

    public static function getGender() {
        return [
            'male' => 'male',
            'female' => 'female',
            'both' => 'both'
        ];
    }
}
