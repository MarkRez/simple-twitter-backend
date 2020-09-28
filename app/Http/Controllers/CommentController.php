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
        return new CommentResource($post->addComment($request->text));
    }
}
