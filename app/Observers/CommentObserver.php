<?php

namespace App\Observers;

use App\Models\Comment;
use App\Models\User;
use App\Events\UserWasMentioned;

class CommentObserver
{
    public function saved(Comment $comment)
    {
        $comment->mentions()->delete();
        $mentionPattern = "/(@(\w+[.]?\w+)+)/";
        preg_match_all($mentionPattern, $comment->text, $mentionList);
        foreach ($mentionList[0] as &$mention) {
            $user = User::where('login', trim($mention, "@"))->first();
            if ($user) {
                $comment->mentions()->create([
                    'user_id' => $user->id,
                ]);
                $user->notify(new UserWasMentioned($comment->id));
            }
        }
    }

    public function deleted(Comment $comment)
    {
        $comment->mentions()->delete();
    }
}
