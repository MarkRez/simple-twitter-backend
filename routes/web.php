<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    echo "<h1>Hello! I am a Laravel server!</h1>";
});

Route::prefix('api')->group(function () {
//    Route::apiResource('posts', 'PostController');
//    Route::apiResource('posts.comments', 'CommentsController', ['except' => ['show', 'update']]);
//    Route::apiResource('posts.likes', 'LikesController', ['except' => ['destroy', 'show', 'update']]);
//    Route::delete('posts/likes', 'LikesController@deleteLike');
//
//    Route::apiResource('users', 'UserController');
////        Route::get('/{id}/followings', 'UserController@getFollowings');
//    Route::apiResource('users.followings', 'FollowingsController');
//
//    Route::prefix('users')->group(function () {
//        Route::post('/{id}/followings', 'UserController@followUser');
////        Route::get('/{id}/blocked', 'UserController@getBlockedUsers');
//        Route::post('/{id}/blocked', 'UserController@blockUser');
//    });
//
//    Route::get('/feed', 'FeedController@get');
//
//    Route::prefix('messages')->group(function () {
//        Route::resource('/', 'MessageController',
//            ['only' => ['index, show']]);
//        Route::post('/{id}', 'MessageController@sendMessage');
//    });
});

Route::get('/home', 'HomeController@index')->name('home');
