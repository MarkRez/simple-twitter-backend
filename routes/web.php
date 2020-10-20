<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'app');
Route::get('/verify/{emailConfirmationToken}', 'AuthController@verifyEmail');
//Route::get('/', function() {
//    return \Illuminate\Support\Facades\Storage::url('avatars/default.jpg');
//});
// /storage/images/avatars/default.jpg
