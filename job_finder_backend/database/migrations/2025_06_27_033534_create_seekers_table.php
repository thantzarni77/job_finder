<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seekers', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->json('skills');
            $table->json('education');
            $table->json('work_experience');
            $table->enum('role', ['junior', 'mid-level', 'senior'])->default('junior')->nullable();
            $table->enum('talent', ['Developer', 'Designer', 'Marketer', 'Writer', 'Manager', 'Coordinator', 'Architect', 'Analyst', 'Other'])->default('Other')->nullable();
            $table->json('social_media_link')->nullable();
            $table->string('image');
            $table->string('password')->nullable();
            $table->longText('bio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seekers');
    }
};
