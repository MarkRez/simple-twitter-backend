<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post) {
        return $post->comments()->orderBy('updated_at', 'desc')->paginate(10);;
    }

    public function store() {

    }
}
