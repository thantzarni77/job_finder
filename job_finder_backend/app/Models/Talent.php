<?php

namespace App\Models;

use App\Models\Seeker;
use Illuminate\Database\Eloquent\Model;

class Talent extends Model
{
    protected $table = 'talent';

    protected $fillable = [
        'name',
    ];

    public function seeker()
    {
        return $this->belongsToMany(Seeker::class);
    }
}
