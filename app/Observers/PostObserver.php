<?php

namespace App\Observers;

use App\Models\Post;
use App\Traits\MentionTrait;

class PostObserver
{
    use MentionTrait;
    public function saved(Post $post)
    {
        $post->parseMentions();
    }

    public function deleted(Post $post)
    {
        $post->deleteMentions();
    }
}
