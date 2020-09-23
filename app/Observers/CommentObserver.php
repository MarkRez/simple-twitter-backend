<?php

namespace App\Observers;

use App\Models\Comment;

class CommentObserver
{
    public function saved(Comment $comment)
    {
        $comment->parseMentions();
    }

    public function deleted(Comment $comment)
    {
        $comment->deleteMentions();
    }
}
