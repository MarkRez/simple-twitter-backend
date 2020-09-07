<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post) {
        return $post->comments;
    }

    public function store() {

    }
}
