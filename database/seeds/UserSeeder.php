<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        factory(User::class, 100)->create();

        User::create([
            'name' => 'Mark',
            'login' => 'mark',
            'email' => 'mark@example.com',
            'email_verified' => true,
            'password' => Hash::make('1234'),
        ]);
    }
}
