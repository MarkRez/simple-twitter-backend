<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostDeleteRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    // TODO
    public function index(User $user) {
        return $user->posts;
    }

    public function show(Post $post)
    {
        return $post;
    }

    // TODO
    public function store(PostCreateRequest $request)
    {
        $post = Auth::user()->posts()->create([
            'text' => $request->text,
        ]);

        return $post;
    }

    public function update(PostUpdateRequest $request, Post $post) {
        $post->update([
            'text' => $request->text,
        ]);

        return $post;
    }

    public function destroy(PostDeleteRequest $request, Post $post) {
        return $post->delete();
    }

    public function getComments($id) {
        return 'comments for $id post';
    }

    public function addComment($id, Request $request) {
        return 'add comment to $id post';
    }

    public function addLike($id, Request $request) {
        return 'add like/dislike to $id post';
    }
}
