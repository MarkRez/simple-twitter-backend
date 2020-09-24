<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Post $post, Request $request)
    {
        $post->addReaction($request->user()->id, $request->reactionType);

        return new PostResource($post);
    }

    public function destroy(Post $post, Request $request)
    {
        $post->removeReaction($request->user()->id);

        return new PostResource($post);
    }
}
