<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        User::all()->each(function ($user) use ($faker) {
            $user->posts()->createMany(factory(Post::class, $faker->numberBetween(1, 50))->make()->toArray());
        });
    }
}
