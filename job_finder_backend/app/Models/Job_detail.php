<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job_detail extends Model
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

    public static function getGender() {
        return [
            'male' => 'male',
            'female' => 'female',
            'both' => 'both'
        ];
    }
}
