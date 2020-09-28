<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
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

class UserReceivedMessage implements ShouldBroadcast
{
    use Queueable;
    private $message;
    private $messageSource;

    public function __construct($message, $source)
    {
        $this->message = $message;
        $this->messageSource = $source;
    }

    public function via()
    {
        return ['broadcast', 'database'];
    }

    public function broadcastWith()
    {
        return [
            'message' => new MessageResource($this->message),
            'source' => $this->messageSource,
        ];
    }

    public function broadcastAs()
    {
        return 'message.received';
    }

    public function broadcastOn()
    {
        return new PrivateChannel('App.User.' . $this->message->recipient_id);
    }
}
