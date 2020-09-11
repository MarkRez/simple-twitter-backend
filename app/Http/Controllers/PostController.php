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

    // TODO
    public function index(User $user) {
        return $user->posts()->orderBy('updated_at', 'desc')->paginate(10);
    }

    public function show(Post $post)
    {
        $post->load('user');

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
}
