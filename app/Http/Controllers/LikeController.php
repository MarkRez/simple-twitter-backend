<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Post $post, Request $request)
    {
        $user = $request->user();
        $post->reactions()->updateOrCreate(
            [
                'user_id' => $user->id
            ],
            [
                'liked' => $request->reactionType,
            ]);

        return $post->fresh();
    }

    public function destroy(Post $post, Request $request)
    {
        $user = $request->user();
        $post->getLikeByUser($user->id)->delete();

        return $post->fresh();
    }
}
