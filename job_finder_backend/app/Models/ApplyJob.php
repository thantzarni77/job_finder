<?php
namespace App\Models;

use App\Models\User;
use App\Models\Seeker;
use App\Models\PostJob;
use App\Models\Employer;
use Illuminate\Database\Eloquent\Model;

class ApplyJob extends Model
{
    protected $fillable = [
        'post_job_id',
        'seeker_id',
        'employer_id',
        'document',
        'message',
        'shortlist',
        'expected_salary',
    ];

    //for multiple document store in array type
    protected $casts = [
        'document' => 'array',
    ];

    public function seeker()
    {
        return $this->belongsTo(Seeker::class);
    }

    public function postJob()
    {
        return $this->belongsTo(PostJob::class);
    }

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
