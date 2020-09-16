<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentCreateRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index(Post $post) {
        return $post->comments()->orderBy('updated_at', 'desc')->paginate(10);
    }

    public function store(CommentCreateRequest $request, Post $post)
    {
        $user = Auth::user();
        $comment = $post->comments()->create([
            'text' => $request->text,
            'user_id' => $user->id,
        ]);

        return $comment->refresh()->load(['user', 'mentionedUsers:users.id,users.login']);
    }
}
