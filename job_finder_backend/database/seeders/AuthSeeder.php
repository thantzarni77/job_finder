<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::created([
            "name" => "admin",
            "email" => "admin@gmail.com",
            "password" => Hash::make("admin1234"),
            "user_type" => "admin"
        ]);
    }
}
