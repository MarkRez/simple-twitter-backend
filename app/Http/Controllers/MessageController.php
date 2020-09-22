<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function dialogs() {
        $sentMessages = Auth::user()->sentMessages->all();
        $receivedMessages = Auth::user()->receivedMessages->all();
        $allMessages = array_merge($sentMessages, $receivedMessages);

        return $allMessages;
    }

    public function index(User $user) {
        Message::whereIn('sender_id', Auth::id())->orderBy('updated_at', 'desc')->paginate(15);
    }

    public function create(User $user, SendMessageRequest $request) {
        return "Send message";
    }
}
