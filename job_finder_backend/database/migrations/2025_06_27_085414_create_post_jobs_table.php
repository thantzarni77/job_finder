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
        Schema::create('post_jobs', function (Blueprint $table) {
            $table->id();
            $table->integer('employer_id');
            $table->integer('category_id');
            $table->string('job_title');
            $table->string('salary')->default('nego');
            $table->enum('job_role',['junior', 'mid-level', 'senior'])->default('junior')->nullable();
            $table->enum('job_posting_status',['pending', 'rejected', 'approved'])->default('pending')->nullable();
            $table->string('location');
            $table->enum('job_type',['full-time', 'part-time', 'contract','internship','freelance','volunteer','hybrid','project-based','remote','other'])->default('full-time')->nullable();
            $table->integer('view_count')->default(0);
            $table->string('job_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_jobs');
    }
};
