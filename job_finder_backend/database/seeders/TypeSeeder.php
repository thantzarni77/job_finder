<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Type::create([
            "id" => 1,
            "name" => "Full Time"
        ]);
        Type::create([
            "id" => 2,
            "name" => "Part Time"
        ]);
        Type::create([
            "id" => 3,
            "name" => "Internship"
        ]);
        Type::create([
            "id" => 4,
            "name" => "Contract"
        ]);
        Type::create([
            "id" => 5,
            "name" => "Temporary"
        ]);
        Type::create([
            "id" => 6,
            "name" => "Volunteer"
        ]);
        Type::create([
            "id" => 7,
            "name" => "Remote"
        ]);
        Type::create([
            "id" => 8,
            "name" => "Hybrid"
        ]);
        Type::create([
            "id" => 9,
            "name" => "Project Based"
        ]);
        Type::create([
            "id" => 10,
            "name" => "Other"
        ]);

    }
}
