<?php

namespace App\Events;

use App\Models\Mention;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;

class UserWasMentioned extends Notification implements ShouldQueue
{
    use Queueable;
    private $sourceId;
    private $mentionSource;
    private $mentionText;

    public function __construct($sourceType ,$Id, $text)
    {
        $this->mentionSource = $sourceType;
        $this->sourceId = $Id;
        $this->mentionText = $text;
    }

    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    public function toArray($notifiable)
    {
        return [
            'source_id' => $this->sourceId,
            'mention_source' => $this->mentionSource,
            'text' => $this->mentionText,
        ];
     }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }

    public function broadcastType()
    {
        return 'user-mention';
    }
}
