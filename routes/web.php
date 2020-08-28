<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    echo "<h1>Hello! I am a Laravel server!</h1>";
});

Route::prefix('api')->group(function () {
    Route::prefix('posts')->group(function () {
        Route::get('/', 'PostController@getAll');
        Route::get('/{id}', 'PostController@getById');
        Route::post('/{id}/addComment', 'PostController@addComment');
        Route::post('/', 'PostController@add');
        Route::put('/{id}', 'PostController@Update');
        Route::delete('/{id}', 'PostController@delete');
    });

    Route::prefix('users')->group(function () {
        Route::get('/', 'UserController@getAll');
        Route::get('/{id}', 'UserController@getById');
        Route::post('/', 'UserController@add');
        Route::put('/{id}', 'UserController@update');
        Route::delete('/{id}', 'UserController@delete');
    });

    Route::prefix('feed')->group(function () {
        Route::get('/', 'FeedController@getAll');
        Route::get('/from-followed', 'FeedController@getFromFollowers');
    });

    Route::prefix('dialogs')->group(function () {
        Route::get('/', 'DialogsController@getAll');
        Route::get('/{id}', 'DialogsController@getById');
        Route::post('/{id}/send', 'DialogsController@sendMessage');
    });
});
