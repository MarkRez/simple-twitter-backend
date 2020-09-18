<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', 'ProfileController@index');
    Route::put('/profile', 'ProfileController@update');
    Route::apiResource('users', 'UserController')->only('index', 'show');
    Route::post('users/{user}/follow', 'FollowController@store');
    Route::delete('users/{user}/follow', 'FollowController@destroy');

    Route::apiResource('posts', 'PostController');
    Route::get('posts/{post}/comments', 'CommentController@index');
    Route::post('posts/{post}/comments', 'CommentController@store');
    Route::post('posts/{post}/like', 'LikeController@store');
    Route::delete('posts/{post}/like', 'LikeController@destroy');
    Route::get('users/{user}/posts', 'PostController@index');


    Route::get('/tags', 'TagController@index');

    Route::get('/feed', 'FeedController@get');

    Route::post('/logout', 'AuthController@logOut');
});

Route::post('/login', 'AuthController@login');
Route::post('/registration', 'AuthController@register');



//
//Auth::routes();
