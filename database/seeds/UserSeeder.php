<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class UserSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        factory(User::class, 100)->create();

        $user = new User();
        $user->name = 'Mark';
        $user->login = 'mark';
        $user->email = 'mark@example.com';
        $user->password = \Illuminate\Support\Facades\Hash::make('1234');
        $user->save();
    }
}
