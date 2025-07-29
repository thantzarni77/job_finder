<?php
namespace Database\Seeders;

use App\Models\Gender;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use Database\Seeders\TypeSeeder;
use Database\Seeders\GenderSeeder;
use Database\Seeders\TalentSeeder;
use Database\Seeders\AdminAuthSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    { 
        $this->call([
            AdminAuthSeeder::class,
            TypeSeeder::class,
            TalentSeeder::class,
            RoleSeeder::class,
            GenderSeeder::class
        ]);
        Category::factory(10)->create();
    }
}
