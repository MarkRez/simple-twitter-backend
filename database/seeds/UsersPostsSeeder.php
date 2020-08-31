<?php

use App\Post;
use App\User;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class UsersPostsSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        factory(User::class, 10)->create()->each(function ($user) use ($faker) {
            $user->posts()->createMany(factory(Post::class, $faker->numberBetween(1, 10))->make()->toArray());
        });
    }
}
