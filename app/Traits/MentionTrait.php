<?php

namespace App\Traits;
use App\Events\UserWasMentioned;
use App\Models\Mention;
use App\Models\User;

trait MentionTrait
{
    public function mentions()
    {
        return $this->morphMany(Mention::class, 'mentionable');
    }

    public function mentionedUsers()
    {
        return $this->hasManyThrough(User::class,
            Mention::class,
            'mentionable_id',
            'id',
            'id',
            'user_id')->where('mentionable_type', self::class);
    }

    public function parseMentions()
    {
        $this->deleteMentions();
        $mentionPattern = "/(@(\w+[.]?\w+)+)/";
        preg_match_all($mentionPattern, $this->text, $mentionList);
        foreach ($mentionList[0] as &$mention) {
            $user = User::where('login', trim($mention, "@"))->first();
            if ($user) {
                $this->mentions()->create([
                    'user_id' => $user->id,
                ]);
                $user->notify(new UserWasMentioned($this->id));
            }
        }
    }

    public function deleteMentions()
    {
        $this->mentions()->delete();
    }
}
