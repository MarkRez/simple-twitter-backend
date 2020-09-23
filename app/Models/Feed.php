<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;

class Feed extends Model
{
    static public function getPostsFromFollowed($leadIds) {
        return Post::whereIn('user_id', $leadIds)->latest();
    }
}
