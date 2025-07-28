<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminAuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            "name"      => "Superadmin",
            "email"     => "superadmin@gmail.com",
            "admin_type" => "superadmin",
            "refresh_token" => Str::random(60),
            "password"  => Hash::make("superadmin1234")
        ]);
    }
}
