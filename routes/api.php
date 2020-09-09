<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/profile', 'ProfileController')->only('index', 'update');
    Route::apiResource('users', 'UserController')->except('store', 'destroy', 'update');

    Route::apiResource('posts', 'PostController');
    Route::get('posts/{post}/comments', 'CommentController@index');
    Route::get('users/{user}/posts', 'PostController@index');

    Route::get('/feed', 'FeedController@get');

    Route::post('/logout', 'AuthController@logOut');
});

Route::post('/login', 'AuthController@login');
Route::post('/registration', 'AuthController@register');



//
//Auth::routes();
