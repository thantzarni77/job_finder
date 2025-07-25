<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface JobDetailRepositoryInterface
{
    public function jobType();
    public function jobRole();
    public function gender();
}



