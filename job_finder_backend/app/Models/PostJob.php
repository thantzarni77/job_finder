<?php
namespace App\Models;

use App\Helpers\Filters;
use App\Models\Employer;
use App\Models\JobDetail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostJob extends Model
{
    use HasFactory;
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
        'view_count',
    ];

    public function jobDetail()
    {
        return $this->hasOne(JobDetail::class, 'post_job_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function scopeFilter(Builder $builder, Filters $filter)
    {
        return $filter->filter($builder);
    }

}
