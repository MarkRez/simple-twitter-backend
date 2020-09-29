<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostDeleteRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(User $user)
    {
        return PostResource::collection($user->latestPosts()->paginate(10));
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function store(PostCreateRequest $request)
    {
        $post = $request->user()->addNewPost($request->text);

        $post->setTags($request->tags);

        return new PostResource($post);
    }

    public function update(PostUpdateRequest $request, Post $post)
    {
        $post->update([
            'text' => $request->text,
        ]);

        $post->setTags($request->tags);

        return new PostResource($post);
    }

    public function destroy(PostDeleteRequest $request, Post $post)
    {
        return $post->delete();
    }

    public function getFeed(Request $request)
    {
        $leadIds = $request->user()->leads->pluck('id');

        $feed = PostResource::collection(Post::getPostsFromFollowed($leadIds)->paginate(15));

        return $feed;
    }
}
