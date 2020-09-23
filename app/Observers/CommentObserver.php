<?php

namespace App\Observers;

use App\Models\Comment;
use App\Traits\MentionTrait;

class CommentObserver
{
    use MentionTrait;
    public function saved(Comment $comment)
    {
        $comment->parseMentions();
    }

    public function deleted(Comment $comment)
    {
        $comment->deleteMentions();
    }
}
