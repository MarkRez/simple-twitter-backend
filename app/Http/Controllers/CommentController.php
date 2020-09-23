<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentCreateRequest;
use App\Models\Post;

class CommentController extends Controller
{
    public function index(Post $post) {
        return $post->comments()->latest()->paginate(10);
    }

    public function store(CommentCreateRequest $request, Post $post)
    {
        $user = $request->user();
        $comment = $post->comments()->create([
            'text' => $request->text,
            'user_id' => $user->id,
        ]);

        return $comment->refresh()->load(['user', 'mentionedUsers:users.id,users.login']);
    }
}
