<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post_job extends Model
{

    protected $fillable = [
        'employer_id',
        'category_id',
        'job_title',
        'salary',
        'role',
        'posting_status',
        'location',
        'type',
        'view_count',
        'job_code',];

        public static function getJobRole() {
            return [
                'junior' => 'junior',
                'mid-level' => 'mid-level',
                'senior' => 'senior'
            ];
        }

        public static function getJobPostingStatus() {
            return [
                'pending' => 'pending',
                'rejected' => 'rejected',
                'approved' => 'approved'
            ];
        }

        public static function getJobType() {
            return [
                'full-time' => 'full-time',
                'part-time' => 'part-time',
                'contract' => 'contract',
                'internship' => 'internship',
                'freelance' => 'freelance',
                'volunteer' => 'volunteer',
                'hybrid' => 'hybrid',
                'project-based' => 'project-based',
                'remote' => 'remote',
                'other' => 'other'
            ];
        }
}
