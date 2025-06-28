<?php

use App\Http\Controllers\ApplyJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobDetailController;
use App\Http\Controllers\JobCategoryController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('job-categories', JobCategoryController::class);
Route::apiResource('job-details', JobDetailController::class);
