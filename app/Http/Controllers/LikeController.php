<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $user = Auth::user();
        $post->reactions()->updateOrCreate(
            [
                'user_id' => $user->id
            ],
            [
                'liked' => $request->reactionType,
            ]);

        return $post->fresh();
    }

    public function destroy(Post $post)
    {
        $user = Auth::user();
        $post->reactions()->where('user_id', $user->id)->delete();

        return $post->fresh();
    }
}
