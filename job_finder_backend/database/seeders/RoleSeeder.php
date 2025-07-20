<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'id' => 1,
            'name' => 'Entry-Level/Junior'
        ]);
        Role::create([
            'id' => 2,
            'name' => 'Mid-Level'
        ]);
        Role::create([
            'id' => 3,
            'name' => 'Senior/Team Lead'
        ]);
        Role::create([
            'id' => 4,
            'name' => 'Management'
        ]);
        Role::create([
            'id' => 5,
            'name' => 'Director-Level'
        ]);
        Role::create([
            'id' => 6,
            'name' => 'Vice President (VP) Level'
        ]);
        Role::create([
            'id' => 7,
            'name' => 'Executive/C-Suite'
        ]);
        Role::create([
            'id' => 8,
            'name' => 'Other'
        ]);
    }
}
