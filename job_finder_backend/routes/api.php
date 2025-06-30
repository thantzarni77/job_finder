<?php

use App\Http\Controllers\ApplyJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostJobController;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\JobCategoryController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

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

//swe
Route::apiResource('post-jobs', PostJobController::class);

