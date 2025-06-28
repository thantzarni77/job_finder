<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Save_job extends Model
{
    protected $fillable = [
        'seeker_id',
        'job_id',
    ];
}
