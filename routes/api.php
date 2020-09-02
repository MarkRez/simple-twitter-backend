<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', 'UserController@profile');

    Route::apiResource('posts', 'PostController');
    Route::get('users/{user}/posts', 'PostController@index');
});

Route::post('/login', 'AuthController@login');
Route::post('/registration', 'AuthController@register');
Route::post('/logout', 'AuthController@logOut');


//
//Auth::routes();
