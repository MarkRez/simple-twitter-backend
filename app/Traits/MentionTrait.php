<?php

namespace App\Traits;
use App\Events\MentionUser;
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

    public function mentionedUsersMany()
    {
        return $this->belongsToMany(User::class, 'mentions', 'mentionable_id', 'user_id')
            ->where('mentionable_type', self::class);
    }

    public function parseMentions()
    {
        $oldMentions = $this->mentions()->pluck('user_id')->all();
        $this->deleteMentions();
        $mentionPattern = "/(@(\w+[.]?\w+)+)/";
        preg_match_all($mentionPattern, $this->text, $mentionList);
        foreach ($mentionList[0] as &$mention) {
            $user = User::getByLogin(trim($mention, "@"));
            if ($user) {
                $this->mentionedUsersMany()->syncWithoutDetaching([$user->id => ['mentionable_type' => self::class]]);

                if (!in_array($user->id, $oldMentions)) {
                    event(new MentionUser(class_basename($this), $this->id, $this->text, $user->id));
                }
            }
        }
    }

    public function deleteMentions()
    {
        $this->mentions()->delete();
    }
}
