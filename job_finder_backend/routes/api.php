<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SaveJobController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ApplyJobController;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\Api\SeekerController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\NewPasswordController;
use App\Http\Controllers\Api\SocialLoginController;
use App\Http\Controllers\EmployerVerficationController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [NewPasswordController::class, 'forgotPassword']);
Route::post('/reset-password', [NewPasswordController::class, 'resetPassword']);

Route::post('/admin/employerVerification/{id}', [EmployerVerficationController::class, 'updateStatus']);


Route::group(["middleware" => "AuthMiddleware"], function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/update-mail', [AuthController::class, 'updateMail']);
    Route::delete('/removeuser', [AuthController::class, 'removeUser']);
    Route::post('/admin-account-creation', [AuthController::class, 'adminAccountCreation']);
    Route::post('/auth/{provider}/call-back', [SocialLoginController::class, 'socialLogin']);

    Route::middleware("UserTypeMiddleware:superadmin")->group(function () {});

    Route::middleware("UserTypeMiddleware:admin")->group(function () {});

    Route::middleware("UserTypeMiddleware:seeker")->group(function () {
        Route::get('/seeker', [SeekerController::class, 'index']);
        Route::post('/seeker', [SeekerController::class, 'store']);
        Route::post('/seeker/{id}', [SeekerController::class, 'update']);
        Route::delete('/seeker/{id}', [SeekerController::class, 'destroy']);
    });

    Route::middleware("UserTypeMiddleware:employer")->group(function () {

        Route::get('/employer', [EmployerController::class, 'index']);
        Route::post('/employer', [EmployerController::class, 'store']);
        Route::post('/employer/{id}', [EmployerController::class, 'update']);
        Route::delete('/employer/{id}', [EmployerController::class, 'destroy']);
    });

    //seeker show his experience project route
    Route::apiResource('project', ProjectController::class);

    //apply job module
    Route::prefix('apply-job')->group(function () {
        Route::post('/', [ApplyJobController::class, 'applyJob']);
        Route::get('/', [ApplyJobController::class, 'applyJobData']);
        //making shortlist
        Route::patch('/shortlist/{id}', [ApplyJobController::class, 'addShortlist']);
        //employer view his uploaded jobs
        Route::get('/employer', [ApplyJobController::class, 'employerPostedJobs']);
        //seeker view his applied jobs
        Route::get('/seeker', [ApplyJobController::class, 'seekerAppliedJobs']);
        //employer view shorlist his posted jobs
        Route::get('/shortlist/employer/{id}', [ApplyJobController::class, 'employerShortlistJobs']);
        //mail send to seeker
        Route::post('/mail', [ApplyJobController::class, 'sendMail']);
    });

    //job save module
    Route::prefix('save-job')->group(function () {
        //save job list
        Route::get('/', [SaveJobController::class, 'index']);
        // create save job
        Route::post('/', [SaveJobController::class, 'store']);
        //view save job
        Route::get('/seeker-save-list', [SaveJobController::class, 'view']);
        //remove save job
        Route::delete('/{id}', [SaveJobController::class, 'destroy']);
    });


    //seeker show his experience project route
    Route::apiResource('project', ProjectController::class);

    //job category route
    Route::apiResource('job-categories', JobCategoryController::class);
    //job detail route
    Route::apiResource('job-details', JobDetailController::class);
    Route::get('types', [JobDetailController::class, 'types']);
});

