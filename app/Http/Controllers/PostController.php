<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostDeleteRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(User $user)
    {
        if ($user->blocked()->wherePivot('blocked_user_id', Auth::id())->exists() && $user->id !== Auth::id()) {
            return response('User blocked you!', 403);
        }

        return $user->posts()->orderBy('created_at', 'desc')->paginate(10);
    }

    public function show(Post $post)
    {
        $post->load('user');

        return $post;
    }

    public function store(PostCreateRequest $request)
    {
        $post = Auth::user()->posts()->create([
            'text' => $request->text,
        ]);

        $post->tags()->attach(array_map( function($tag)
            {
                return ['tag_id' => $tag['id']];
            }, $request->tags)
        );

        return $post->refresh()->load(['user', 'mentionedUsers:users.id,users.login', 'tags']);
    }

    public function update(PostUpdateRequest $request, Post $post)
    {
        $post->update([
            'text' => $request->text,
        ]);

        $post->tags()->sync(array_map( function($tag)
            {
                return ['tag_id' => $tag['id']];
            }, $request->tags)
        );

        return $post->refresh()->load(['user', 'mentionedUsers:users.id,users.login', 'tags']);
    }

    public function destroy(PostDeleteRequest $request, Post $post)
    {
        return $post->delete();
    }
}
