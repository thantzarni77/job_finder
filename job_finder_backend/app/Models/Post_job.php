<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post_job extends Model
{

    protected $fillable = [
        'company_id',
        'employer_id',
        'category_id',
        'title',
        'salary',
        'role',
        'posting_status',
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
