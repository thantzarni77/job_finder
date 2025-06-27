<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apply_job extends Model
{
    protected $fillable = [
        'job_id',
        'seeker_id',
        'employer_id',
        'document',
        'message',
        'shortlisted',
        'expected_salary'
    ];
}
