<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    static public function getDialogMessages($user1, $user2)
    {
        return self::whereIn('sender_id', [$user1, $user2])
            ->whereIn('recipient_id', [$user1, $user2])
            ->latest()
            ->paginate(15);
    }
}
