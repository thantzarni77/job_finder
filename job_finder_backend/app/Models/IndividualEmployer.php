<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndividualEmployer extends Model
{
    protected $table = "individual_employers";

    protected $fillable = [
        "user_id",
        "title",
        "message"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
