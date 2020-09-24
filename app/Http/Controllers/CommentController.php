<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentCreateRequest;
use App\Http\Resources\CommentResource;
use App\Models\Post;

class CommentController extends Controller
{
    public function index(Post $post) {
        return CommentResource::collection($post->comments()->paginate(10));
    }

    public function store(CommentCreateRequest $request, Post $post)
    {
        $comment = $post->comments()->create([
            'text' => $request->text,
            'user_id' => $request->user()->id,
        ]);

        return new CommentResource($comment);
    }
}
