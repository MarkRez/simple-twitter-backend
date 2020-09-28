<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserWasMentioned implements ShouldBroadcast
{
    use Queueable;
    private $sourceId;
    private $mentionSource;
    private $mentionText;
    private $mentionedUser;

    public function __construct($sourceType ,$Id, $text, $userId)
    {
        $this->mentionSource = $sourceType;
        $this->sourceId = $Id;
        $this->mentionText = $text;
        $this->mentionedUser = $userId;
    }

    public function via()
    {
        return ['broadcast', 'database'];
    }

    public function broadcastWith()
    {
        return [
            'source_id' => $this->sourceId,
            'source' => $this->mentionSource,
            'text' => $this->mentionText,
        ];
     }

    public function broadcastAs()
    {
        return 'user.mentioned';
    }

    public function broadcastOn()
    {
        return new PrivateChannel('App.User.' . $this->mentionedUser);
    }
}
