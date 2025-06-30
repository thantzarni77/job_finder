<?php

namespace App\Providers;

use App\Repositories\PostJobRepository;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\PostJobRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(PostJobRepositoryInterface::class, PostJobRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
