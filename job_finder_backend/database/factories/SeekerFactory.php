<?php

namespace Database\Factories;

use App\Models\Seeker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seeker>
 */
class SeekerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Seeker::class;

    public function definition(): array
    {
        $skills = [
            'PHP',
            'Laravel',
            'Vue.js',
            'React',
            'Node.js',
            'Express.js',
            'JavaScript',
            'TypeScript',
            'HTML',
            'CSS',
            'Tailwind CSS',
            'Bootstrap',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Linux',
            'Next.js',
            'Figma',
            'UI Design',
            'UX Design',
            'Python',
            'Django',
            'Flask',
            'Go',
            'Rust',
            'C++',
            'Java',
            'Spring Boot',
            'C#',
            '.NET',
        ];

        $talents = [
            'Developer',
            'Designer',
            'Marketer',
            'Writer',
            'Manager',
            'Coordinator',
            'Architect',
            'Analyst',
            'Other',
        ];


        $social_media_links_array = [
            ['facebook' => 'https://facebook.com/' . $this->faker->userName()],
            ['linkedin' => 'https://linkedin.com/in/' . $this->faker->userName(),],
            ['twitter' => 'https://twitter.com/' . $this->faker->userName(),],
            ['instagram' => 'https://instagram.com/' . $this->faker->userName(),],
            ['github' => 'https://github.com/' . $this->faker->userName(),]
        ];


        $skill = $this->faker->randomElements($skills, rand(3, 6));
        $talent = $this->faker->randomElement($talents);

        $random_links = $this->faker->randomElements($social_media_links_array, rand(2, 4));
        $social_media_links = array_merge($random_links);




        return [
            'user_id' => $this->faker->unique()->numberBetween(1, 10),
            'skills'  => $skill,
            'education' => [
                [
                    'school' => $this->faker->company() . "University",
                    'degree' => 'Bechlor of' . $this->faker->word(),
                    'year' => $this->faker->year(),
                ]
            ],
            'work_experience' => [
                [
                    'company' => $this->faker->company(),
                    'position' => $this->faker->jobTitle(),
                    'start_date' => $this->faker->date(),
                    'end_date' => $this->faker->date(),
                ]
            ],
            'role' => $this->faker->word(),
            'talent' => $talent,
            'social_media_link' => $social_media_links,
            'image' => $this->faker->sentence(),
            'bio' => $this->faker->paragraph(),
        ];
    }
}
