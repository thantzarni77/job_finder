<?php

namespace App\Models;

use App\Helpers\Filters;
use App\Models\ApplyJob;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Seeker extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'skills',
        'education',
        'work_experience',
        'role',
        'talent',
        'social_media_link',
        'image',
        'bio'
    ];

    public function user()
    {
        return $this->hasOne(User::class , 'id', 'user_id');
    }

    public function applyJob()
    {
        return $this->hasMany(ApplyJob::class);
    }

    public function clean($value)
    {
        $decoded = json_decode($value, true);
        return $decoded !== null ? $decoded : trim($value, '"');
    }


    public function scopeFilter(Builder $builder, Filters $filter)
    {
        return $filter->filter($builder);
    }
}
