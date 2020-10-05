<?php

namespace App\Http\Controllers;

use App\Events\NewDirectMessage;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\ContactedUserResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\MessagesCollection;
use App\Models\Dialog;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Dialog $dialog)
    {
        return new MessagesCollection($dialog->messages()->paginate(15), $dialog->dialogUsers()->first());
    }

    public function create(User $user, SendMessageRequest $request)
    {
        $newMessage = $request->user()->sendMessage($user, $request->text);
        event(new NewDirectMessage($newMessage));
        return new MessageResource($newMessage);
    }
}
