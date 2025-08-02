<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\NewPasswordController;
use App\Http\Controllers\Api\SeekerController;
use App\Http\Controllers\Api\SocialLoginController;
use App\Http\Controllers\ApplyJobController;
use App\Http\Controllers\DeadlineController;
use App\Http\Controllers\EmployerVerficationController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\PostJobController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SaveJobController;
use App\Http\Controllers\TalentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::post('/superadmin/login', [AdminAuthController::class, 'login']);


Route::post('/registerstepone', [AuthController::class, 'registerStepOne']);
Route::post('/registersteptwo/{id}', [AuthController::class, 'registerStepTwo']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [NewPasswordController::class, 'forgotPassword']);
Route::post('/reset-password', [NewPasswordController::class, 'resetPassword']);

//types
Route::get('types', [JobDetailController::class, 'types']);
Route::get('roles', [JobDetailController::class, 'roles']);
Route::get('genders', [JobDetailController::class, 'genders']);

//talent module
Route::prefix('talent')->group(function () {
    //save job list
    Route::get('/', [TalentController::class, 'index']);
    // create save job
    Route::post('/', [TalentController::class, 'create']);
    //view save job
    Route::put('/{id}', [TalentController::class, 'update']);
    //remove save job
    Route::delete('/{id}', [TalentController::class, 'destroy']);
});

Route::group(["middleware" => "AuthMiddleware"], function () {

    Route::middleware("UserTypeMiddleware:superadmin")->group(function () {
        Route::prefix('admin')->group(function () {
            Route::get('/', [AdminAuthController::class, 'index']);
            Route::post('/', [AdminAuthController::class, 'store']);
            Route::get('/{id}', [AdminAuthController::class, 'show']);
            Route::post('/{id}', [AdminAuthController::class, 'update']);
            Route::delete('/{id}', [AdminAuthController::class, 'destroy']);
        });
    });

    Route::middleware("AdminSuperMiddleware")->group(function () {
        //job category route
        Route::apiResource('job-categories', JobCategoryController::class);

        Route::post('/admin/employerVerification/{id}', [EmployerVerficationController::class, 'updateStatus']);
        Route::post('/admin/post-verification/{id}', [PostJobController::class, 'postVerification']);
    });

    Route::post('/change-password/{id}', [NewPasswordController::class, 'changePassword']);

    Route::prefix("user")->group(function () {
        Route::get("/all", [UserController::class, 'getAllUsers']);
        Route::get('/get', [UserController::class, 'getSingleUserData']);
        Route::post('/update/{id}', [UserController::class, 'updateUser']);

        //need to show individual employer profile pic etc on non-login user
        Route::get('/individual-employer/{id}', [UserController::class, "getIndividualEmployerData"])->withoutMiddleware("AuthMiddleware");
    });

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/update-mail', [AuthController::class, 'updateMail']);
    Route::delete('/removeuser', [AuthController::class, 'removeUser']);
    Route::post('/admin-account-creation', [AuthController::class, 'adminAccountCreation']);
    Route::post('/auth/{provider}/call-back', [SocialLoginController::class, 'socialLogin']);

    Route::middleware("UserTypeMiddleware:seeker")->group(function () {

        //need to show seeker list on non-login user and employers
        Route::get('/seeker', [SeekerController::class, 'index'])->withoutMiddleware(['UserTypeMiddleware:seeker', "AuthMiddleware"]);

        Route::get('/seeker/{id}', [SeekerController::class, 'getdata'])->withoutMiddleware('UserTypeMiddleware:seeker');

        //need to show seeker data on non-login user and employers
        Route::get('/seeker-data/{id}', [SeekerController::class, 'getSeekerData'])->withoutMiddleware(['UserTypeMiddleware:seeker', "AuthMiddleware"]);

        Route::post('/seeker', [SeekerController::class, 'store']);
        Route::post('/seeker/{id}', [SeekerController::class, 'update']);
        Route::delete('/seeker/{id}', [SeekerController::class, 'destroy']);

        Route::prefix("project")->group(function () {
            Route::get("/", [ProjectController::class, 'index']);
            Route::post("/", [ProjectController::class, 'store']);

            //need to show user projects on non-login user and employers
            Route::get("/{userID}", [ProjectController::class, 'show'])->withoutMiddleware(["AuthMiddleware", "UserTypeMiddleware:seeker"]);

            Route::post("/{userID}", [ProjectController::class, 'update']);
            Route::post("/{userID}", [ProjectController::class, 'destroy']);
        });
    });

    Route::middleware("UserTypeMiddleware:employer")->group(function () {

        Route::get('/employer', [EmployerController::class, 'index'])->withoutMiddleware(["AuthMiddleware", "UserTypeMiddleware:employer"]);
        Route::get('/employer/{id}', [EmployerController::class, 'getdata']);

        //need to show employer data on non-login user and seekers
        Route::get('/employer-data/{id}', [EmployerController::class, 'getEmployerData'])->withoutMiddleware(["AuthMiddleware", "UserTypeMiddleware:employer"]);

        Route::post('/employer', [EmployerController::class, 'store']);
        Route::post('/employer/{id}', [EmployerController::class, 'update']);
        Route::delete('/employer/{id}', [EmployerController::class, 'destroy']);

        // Route::get('/indi_employer', [IndividualEmployerController::class, 'index']);
        // Route::get('/indi_employer/{id}', [IndividualEmployerController::class, 'getData']);
        // Route::get('/indi_data_employer/{id}', [IndividualEmployerController::class, 'getIndiEmployerData']);

        //job post
        Route::prefix('post-jobs')->group(function () {
            Route::get('/all', [PostJobController::class, 'getAllPosts'])->withoutMiddleware(['AuthMiddleware', 'UserTypeMiddleware:employer']);

            //need to show job post list on non-login user and seekers
            Route::get('/', [PostJobController::class, 'index'])->withoutMiddleware(['AuthMiddleware', 'UserTypeMiddleware:employer']);

            Route::post('/', [PostJobController::class, 'store']);

            //need to show job details on non-login user and seekers
            Route::get('/{id}', [PostJobController::class, 'show'])->withoutMiddleware(['AuthMiddleware', 'UserTypeMiddleware:employer']);

            Route::post('/{id}', [PostJobController::class, 'update']);
            Route::delete('/{id}', [PostJobController::class, 'destroy']);
        });
    });

    Route::prefix('apply-job')->group(function () {

        // seeker view his applied jobs
        Route::get('/seeker', [ApplyJobController::class, 'seekerAppliedJobs'])->withoutMiddleware("UserTypeMiddleware:seeker");

        // employer view his uploaded jobs
        Route::get('/employer', [ApplyJobController::class, 'employerPostedJobs']);
        // employer view shorlist his posted jobs
        Route::get('/shortlist/employer/{id}', [ApplyJobController::class, 'employerShortlistJobs']);

        // mail send to seeker
        Route::post('/mail', [ApplyJobController::class, 'sendMail']);
        // apply job
        Route::post('/', [ApplyJobController::class, 'applyJob']);

        //get applied seekers on jobs
        Route::get('/{id}', [ApplyJobController::class, 'applyJobData']);
        // making shortlist
        Route::patch('/shortlist/{id}', [ApplyJobController::class, 'addShortlist']);
        // remove post
        Route::delete('/{id}', [ApplyJobController::class, 'destroy']);
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
        //check if job is saved
        Route::post("/check", [SaveJobController::class, 'checkIsSaved']);
    });

    //job detail route
    Route::apiResource('job-details', JobDetailController::class);

    //job category route
    Route::apiResource('job-categories', JobCategoryController::class)->withoutMiddleware("AuthMiddleware");

    Route::get('/deadline-alerts', [DeadlineController::class, 'alertNearDeadline']);
});
