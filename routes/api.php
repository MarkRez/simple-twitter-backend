<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', 'ProfileController@index');
    Route::put('/profile', 'ProfileController@update');
    Route::get('users/{user}', 'UserController')->middleware('blocked.user');
    Route::post('users/{user}/follow', 'FollowController@store');
    Route::delete('users/{user}/follow', 'FollowController@destroy');
    Route::post('users/{user}/block', 'BlockController@store');
    Route::delete('users/{user}/block', 'BlockController@destroy');

    Route::apiResource('posts', 'PostController');
    Route::get('posts/{post}/comments', 'CommentController@index');
    Route::post('posts/{post}/comments', 'CommentController@store');
    Route::post('posts/{post}/like', 'LikeController@store');
    Route::delete('posts/{post}/like', 'LikeController@destroy');
    Route::get('users/{user}/posts', 'PostController@index')->middleware('blocked.user');

    Route::get('/messages', 'MessageController@dialogs');
    Route::get('/messages/{user}', 'MessageController@index');
    Route::post('/messages/{user}', 'MessageController@create');

    Route::get('/tags', 'TagController');

    Route::get('/feed', 'PostController@getFeed');

    Route::post('/logout', 'AuthController@logOut');
});

Route::post('/login', 'AuthController@login');
Route::post('/registration', 'AuthController@register');
