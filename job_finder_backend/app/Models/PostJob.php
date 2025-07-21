<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostJob extends Model
{
    //
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
}
