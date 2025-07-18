<?php

namespace App\Models;

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
        'company_description',
        'company_type',
        'verification',
    ];

    //verification status
    public static function getVerificationStatus() {
        return [
            'pending' => 'pending',
            'verified' => 'verified',
            'rejected'  => 'rejected'
        ];
    }
}
