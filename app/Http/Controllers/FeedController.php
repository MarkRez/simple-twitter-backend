<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedController extends Controller
{
    public function get() {
        $user = Auth::user();

        $leadsIds = $user->leads->pluck('id');

        $post = Post::whereIn('user_id', $leadsIds)->orderBy('updated_at', 'desc')->paginate(10);

        return $post;
    }
}
