<?php

namespace App\Models;

use App\Helpers\Filters;
use Illuminate\Database\Eloquent\Builder;
use App\Models\User;
use App\Models\PostJob;
use App\Models\ApplyJob;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'company_address',
        'company_phone',
        'company_email',
        'company_image',
        'company_type',
        'company_description',
        'verification'
    ];

    public function user()
    {
        return $this->belongsTo(User::class ,'user_id');
    }

    public function postJob()
    {
        return $this->hasMany(PostJob::class);
    }

    public function applyJob()
    {
        return $this->hasMany(ApplyJob::class);
    }
    //verification status
    public static function getVerificationStatus()
    {
        return [
            'pending' => 'pending',
            'verified' => 'verified',
            'rejected'  => 'rejected'
        ];
    }

    public function scopeFilter(Builder $builder, Filters $filter)
    {
        return $filter->filter($builder);
    }
}
