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
        Schema::create('job_details', function (Blueprint $table) {
            $table->id();
            $table->integer('post_job_id');
            $table->longText('job_requirements');
            $table->longText('job_description');
            $table->timestamp('deadline');
            $table->integer('vacancy');
            $table->string('note');
            $table->string('benefits');
            $table->enum('gender',['male', 'female', 'both'])->default('both')->nullable();
            $table->integer('save_count')->default(0);
            $table->integer('apply_count')->default(0);
            $table->longText('job_benefits');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_details');
    }
};
