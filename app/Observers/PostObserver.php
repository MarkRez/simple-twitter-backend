<?php

namespace App\Observers;

use App\Models\Mention;
use App\Models\Post;
use App\Models\User;

class PostObserver
{
    public function saved(Post $post)
    {
        $post->mentions()->delete();
        $mentionPattern = "/(@(\w+[.]?\w+)+)/";
        preg_match_all($mentionPattern, $post->text, $mentionList);
        foreach ($mentionList[0] as &$mention) {
            $user = User::where('login', trim($mention, "@"))->first();
            if ($user) {
                $post->mentions()->create([
                    'user_id' => $user->id,
                    'mentionable_id' => $post->id,
                ]);
            }
        }
    }
}
