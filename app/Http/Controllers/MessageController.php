<?php

namespace App\Http\Controllers;

use App\Events\NewDirectMessage;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\MessagesCollection;
use App\Models\Dialog;

class MessageController extends Controller
{
    public function index(Dialog $dialog)
    {
        return new MessagesCollection($dialog->latestMessages()->paginate(15), $dialog->dialogUsers()->first());
    }

    public function create(Dialog $dialog, SendMessageRequest $request)
    {
        $newMessage = $request->user()->sendMessage($dialog, $request->text);
        event(new NewDirectMessage($newMessage, $dialog->dialogUsers()->first()->id));
        return new MessageResource($newMessage);
    }
}
