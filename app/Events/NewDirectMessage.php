<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewDirectMessage implements ShouldBroadcast
{
    use Queueable;
    private $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function via()
    {
        return ['broadcast', 'database'];
    }

    public function broadcastWith()
    {
        return [
            'message' => new MessageResource($this->message),
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
