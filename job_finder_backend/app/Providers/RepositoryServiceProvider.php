<?php
namespace App\Providers;

use App\Repositories\AuthRepository;
use App\Repositories\AdminRepository;
use App\Repositories\SaveJobRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ApplyJobRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\JobDetailRepository;
use App\Interfaces\AuthRepositoryInterface;
use App\Interfaces\AdminRepositoryInterface;
use Google\Service\PubsubLite\Resource\Admin;
use App\Interfaces\SaveJobRepositoryInterface;
use App\Interfaces\ApplyJobRepositoryInterface;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\JobDetailRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(ApplyJobRepositoryInterface::class, ApplyJobRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
         $this->app->bind(JobDetailRepositoryInterface::class, JobDetailRepository::class);
        $this->app->bind(SaveJobRepositoryInterface::class, SaveJobRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
