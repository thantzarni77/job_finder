<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\SeekerController;
use App\Http\Controllers\Api\SocialLoginController;
use App\Http\Controllers\ApplyJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\JobCategoryController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::group(["middleware" => "AuthMiddleware"],function(){
    Route::get('/profile',[AuthController::class,'profile']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/refresh',[AuthController::class,'refresh']);
    Route::delete('/removeuser',[AuthController::class,'removeUser']);
    Route::post('/auth/{provider}/call-back', [SocialLoginController::class, 'socialLogin']);

    Route::middleware("UserTypeMiddleware:superadmin")->group(function(){
       
    });

    Route::middleware("UserTypeMiddleware:admin")->group(function(){
        
    });

    Route::middleware("UserTypeMiddleware:seeker")->group(function(){
       Route::get('/seeker',[SeekerController::class,'index']);
       Route::post('/seeker',[SeekerController::class,'store']);
       Route::post('/seeker/{id}',[SeekerController::class,'update']);
       Route::delete('/seeker/{id}',[SeekerController::class,'destroy']);
    });

    Route::middleware("UserTypeMiddleware:employer")->group(function(){

        Route::get('/employer',[EmployerController::class,'index']);
        Route::post('/employer',[EmployerController::class,'store']);
        Route::post('/employer/{id}',[EmployerController::class,'update']);
        Route::delete('/employer/{id}',[EmployerController::class,'destroy']);
       
    });
  
    //apply job module
    Route::prefix('apply-job')->group(function () {
        Route::post('/', [ApplyJobController::class, 'applyJob']);
        Route::get('/', [ApplyJobController::class, 'applyJobData']);
        //making shortlist
        Route::patch('/shortlist/{id}', [ApplyJobController::class, 'addShortlist']);
        //employer view his uploaded jobs
        Route::get('/employer/{id}', [ApplyJobController::class, 'employerPostedJobs']);
        //seeker view his applied jobs
        Route::get('/seeker/{id}', [ApplyJobController::class, 'seekerAppliedJobs']);
        //employer view shorlist his posted jobs
        Route::get('/shortlist/employer/{id}', [ApplyJobController::class, 'employerShortlistJobs']);
        //mail send to seeker
        Route::post('/mail', [ApplyJobController::class, 'sendMail']);
    });


    Route::apiResource('job-categories', JobCategoryController::class);
    Route::apiResource('job-details', JobDetailController::class);

});



