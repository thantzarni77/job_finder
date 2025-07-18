<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndividualEmployer extends Model
{
    protected $table = "individual_employers";

    protected $fillable = [
        "title",
        "message"
    ];
}
