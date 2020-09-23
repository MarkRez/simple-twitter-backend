<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function dialogs(Request $request) {
        $sentMessages = $request->user()->sentMessages->all();
        $receivedMessages = $request->user()->receivedMessages->all();
        $allMessages = array_merge($sentMessages, $receivedMessages);

        return $allMessages;
    }

    public function index(Request $request) {
        Message::whereIn('sender_id', $request->user()->id)->latest()->paginate(15);
    }

    public function create(User $user, SendMessageRequest $request) {
        return "Send message";
    }
}
