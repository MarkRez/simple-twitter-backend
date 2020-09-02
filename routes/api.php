<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('posts', 'PostController');
    Route::get('users/{user}/posts', 'PostController@index');
});

Route::post('/login', 'LoginController@token');
//
//Auth::routes();
