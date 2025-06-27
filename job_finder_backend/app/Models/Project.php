<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['seeker_id','project_title','project_image','project_description','project_link'];
}
