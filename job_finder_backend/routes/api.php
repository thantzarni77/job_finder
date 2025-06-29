<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmployerController;
use App\Http\Controllers\Api\SeekerController;
use App\Http\Controllers\Api\SocialLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

});



