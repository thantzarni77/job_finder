<?php

namespace App\Providers;

use App\Repositories\PostJobRepository;
use Illuminate\Support\ServiceProvider;
<<<<<<< HEAD
use App\Interfaces\PostJobRepositoryInterface;

=======
>>>>>>> bc745a3049d67e9320cac7e45df0b1755715770e
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
<<<<<<< HEAD
        //
        $this->app->bind(PostJobRepositoryInterface::class, PostJobRepository::class);
=======
>>>>>>> bc745a3049d67e9320cac7e45df0b1755715770e
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
