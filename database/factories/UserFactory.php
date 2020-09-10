<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(User::class, function (Faker $faker) {
    return [
        'login' => $faker->unique()->userName,
        'email' => $faker->unique()->safeEmail,
        'name' => $faker->firstName,
        'password' => Hash::make('password'),
        // password
    ];
});
