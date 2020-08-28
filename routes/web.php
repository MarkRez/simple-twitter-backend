<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    echo "<h1>Hello! I am a Laravel server!</h1>";
});

Route::prefix('api')->group(function () {
    Route::prefix('posts')->group(function () {
        Route::get('/', 'PostController@getAll');
        Route::get('/{id}', 'PostController@get');
        Route::post('/', 'PostController@add');
        Route::put('/{id}', 'PostController@update');
        Route::delete('/{id}', 'PostController@delete');

        Route::get('/{id}/comments', 'PostController@getComments');
        Route::post('/{id}/comments', 'PostController@addComment');
        Route::get('/{id}/likes-dislikes', 'PostController@getLikes');
        Route::post('/{id}/likes-dislikes', 'PostController@addLike');
    });

    Route::prefix('users')->group(function () {
//        Route::get('/', 'UserController@getAll');
        Route::get('/{id}', 'UserController@get');
        Route::post('/', 'UserController@add');
        Route::put('/{id}', 'UserController@update');
        Route::delete('/{id}', 'UserController@delete');

        Route::get('/{id}/followings', 'UserController@getFollowings');
        Route::post('/{id}/followings', 'UserController@followUser');
        Route::get('/{id}/blocked', 'UserController@getBlockedUsers');
        Route::post('/{id}/blocked', 'UserController@blockUser');
    });

    Route::prefix('feed')->group(function () {
        Route::get('/', 'FeedController@get');
        Route::get('/from-followed', 'FeedController@getFromFollowings');
    });

    Route::prefix('messages')->group(function () {
        Route::get('/', 'MessagesController@getAll');
        Route::get('/{id}', 'MessagesController@get');
        Route::post('/{id}', 'MessagesController@sendMessage');
    });
});
