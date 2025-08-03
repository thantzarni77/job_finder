<?php

namespace App\Providers;

use App\Interfaces\ApplyJobRepositoryInterface;
use App\Interfaces\AuthRepositoryInterface;
use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ContactFormInterface;
use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\EmployerVerificationInterface;
use App\Interfaces\JobDetailRepositoryInterface;
use App\Interfaces\PostJobRepositoryInterface;
use App\Interfaces\ProjectRepositoryInterface;
use App\Interfaces\SaveJobRepositoryInterface;
use App\Interfaces\TalentRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\ApplyJobRepository;
use App\Repositories\AuthRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ContactFormRepository;
use App\Repositories\ContactRepository;
use App\Repositories\EmployerVerficationRepository;
use App\Repositories\JobDetailRepository;
use App\Repositories\PostJobRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\SaveJobRepository;
use App\Repositories\TalentRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

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
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
        $this->app->bind(EmployerVerificationInterface::class, EmployerVerficationRepository::class);
        $this->app->bind(PostJobRepositoryInterface::class, PostJobRepository::class);
        $this->app->bind(TalentRepositoryInterface::class, TalentRepository::class);
        $this->app->bind(ContactFormInterface::class, ContactFormRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(ContactRepositoryInterface::class, ContactRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
