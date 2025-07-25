<?php

namespace Database\Factories;

use App\Models\PostJob;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PostJob>
 */
class PostJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = PostJob::class;

    public function definition(): array
    {

        $jobTypes = [
            'Full Time', 
            'Part Time' , 
            "Internship",
            "Contract",
            "Temporary",
            "Volunteer",
            "Remote",
            "Hybrid",
            "Project Based", 
            "Other",
        ];
        $roles = [
            'Entry-Level/Junior',
            'Mid-Level',
            'Senior/Team Lead',
            'Management',
            'Director-Level',
            'Vice President (VP) Level',
            'Executive/C-Suite',
            'Other',
        ];

        $posting_statuses = [
            'pending',
            'rejected',
            'approved',
        ];

        $jobType = $this->faker->randomElement($jobTypes);
        $role = $this->faker->randomElement($roles);
        $posting_status = $this->faker->randomElement($posting_statuses);

        
        return [
            'employer_id' => rand(1,5),
            'category_id' => rand(1,10),
            'job_title' => fake()->name(),
            'salary' => rand(500000, 2000000),
            'role' => $role,
            'location' => $this->faker->address(),
            'type' => $jobType,
            'view_count' => rand(10,1000),
            'job_code' => rand(10000,50000),
        ];
    }
}
