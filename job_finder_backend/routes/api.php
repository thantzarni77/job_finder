<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SocialLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::group(["middleware" => "AuthMiddleware"],function(){
    Route::get('/profile',[AuthController::class,'profile']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/refresh',[AuthController::class,'refresh']);
    Route::post('/auth/{provider}/call-back', [SocialLoginController::class, 'socialLogin']);

    Route::middleware("UserTypeMiddleware:superadmin")->group(function(){
       
    });

    Route::middleware("UserTypeMiddleware:admin")->group(function(){
        
    });

    Route::middleware("UserTypeMiddleware:seeker")->group(function(){
       
    });

    Route::middleware("UserTypeMiddleware:employer")->group(function(){
       
    });

});



