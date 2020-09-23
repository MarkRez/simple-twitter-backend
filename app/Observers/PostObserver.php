<?php

namespace App\Observers;

use App\Models\Post;

class PostObserver
{
    public function saved(Post $post)
    {
        $post->parseMentions();
    }

    public function deleted(Post $post)
    {
        $post->deleteMentions();
    }
}
