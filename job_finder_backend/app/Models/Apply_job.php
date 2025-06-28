<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apply_job extends Model
{
    protected $fillable = [
        'post_job_id',
        'seeker_id',
        'employer_id',
        'document',
        'message',
        'shortlist',
        'expected_salary'
    ];

    //for multiple document store in array type
    protected $casts = [
        'document' => 'array'
    ];
}
