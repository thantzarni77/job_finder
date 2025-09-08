<?php
namespace Database\Seeders;

use App\Models\User;
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
        User::create([
            "name"          => "Superadmin",
            "email"         => "superadmin@gmail.com",
            "user_type"     => "superadmin",
            "refresh_token" => Str::random(60),
            "password"      => Hash::make("superadmin123"),
        ]);
    }
}
