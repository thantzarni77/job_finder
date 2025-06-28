<?php

use App\Http\Controllers\ApplyJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//apply job module
Route::prefix('apply-job')->group(function () {
    Route::post('/', [ApplyJobController::class, 'applyJob']);
    Route::get('/', [ApplyJobController::class, 'applyJobData']);
    Route::patch('/shortlist/{id}', [ApplyJobController::class, 'addShortlist']);
});


