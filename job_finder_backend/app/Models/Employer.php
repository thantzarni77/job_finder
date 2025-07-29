<?php

namespace App\Models;

use App\Helpers\Filters;
use Illuminate\Database\Eloquent\Builder;
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
