<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seeker extends Model
{
    protected $fillable = [
        'user_id',
        'skills',
        'work_experience',
        'education',
        'role',
        'talent',
        'social_media_link',
        'seeker_image',
        'bio',
    ];

    public static function getRole() {
        return [
            'junior' => 'junior',
            'mid-level' => 'mid-level',
            'senior' => 'senior'
        ];
    }

    public static function getTalent() {
        return [
            'Developer' => 'Developer',
            'Designer' => 'Designer',
            'Marketer' => 'Marketer',
            'Writer' => 'Writer',
            'Manager' => 'Manager',
            'Coordinator' => 'Coordinator',
            'Architect' => 'Architect',
            'Analyst' => 'Analyst',
            'Other' => 'Other'
        ];
    }
}
