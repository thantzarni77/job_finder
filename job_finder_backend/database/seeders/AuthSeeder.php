<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::create([
        //     "name"      => "admin",
        //     "email"     => "admin@gmail.com",
        //     "password"  => Hash::make("admin1234"),
        //     "user_type" => "admin"
        // ]);
    
    }
}
