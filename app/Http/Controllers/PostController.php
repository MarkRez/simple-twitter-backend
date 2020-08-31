<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function show($id)
    {
        return "post $id";
    }

    public function store()
    {
        return 'post created';
    }

    public function update($id) {
        return 'post $id updated';
    }

    public function destroy($id) {
        return 'post $id deleted';
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
