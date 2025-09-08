<?php

namespace Database\Seeders;

use App\Models\Talent;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TalentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Talent::create([
            'id' => 1,
            'name' => 'Developer'
        ]);
        Talent::create([
            'id' => 2,
            'name' => 'Designer'
        ]);
        Talent::create([
            'id' => 3,
            'name' => 'Marketer'
        ]);
        Talent::create([
            'id' => 4,
            'name' => 'Writer'
        ]);
        Talent::create([
            'id' => 5,
            'name' => 'Manager'
        ]);
        Talent::create([
            'id' => 6,
            'name' => 'Coordinator'
        ]);
        Talent::create([
            'id' => 7,
            'name' => 'Architect'
        ]);
        Talent::create([
            'id' => 8,
            'name' => 'Analyst'
        ]);
        Talent::create([
            'id' => 9,
            'name' => 'Other'
        ]);
    }
}
