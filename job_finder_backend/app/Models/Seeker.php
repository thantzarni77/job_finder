<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seeker extends Model
{
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

    public function user(){
        return $this->hasOne(User::class);
    }

    public function clean($value)
    {
        $decoded = json_decode($value, true);
        return $decoded !== null ? $decoded : trim($value, '"');
    }
}
