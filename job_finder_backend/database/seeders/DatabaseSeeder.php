<?php
namespace Database\Seeders;

use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\RoleSeeder;
use Database\Seeders\TalentSeeder;
use Database\Seeders\TypeSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory(10)->create();
        $this->call([
            TypeSeeder::class,
            TalentSeeder::class,
            RoleSeeder::class,

        ]);
        Category::factory(10)->create();
    }
}
