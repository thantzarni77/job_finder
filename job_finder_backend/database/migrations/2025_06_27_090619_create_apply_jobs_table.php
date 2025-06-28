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
        Schema::create('apply_jobs', function (Blueprint $table) {
            $table->id();
            $table->integer('seeker_id');
            $table->integer('employer_id');
            $table->integer('post_job_id');
            $table->text('document');
            $table->string('message')->nullable();
            $table->boolean('shortlist')->default(false);
            $table->string('expected_salary')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apply_jobs');
    }
};
