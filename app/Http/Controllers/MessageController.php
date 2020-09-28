<?php

namespace App\Http\Controllers;

use App\Events\UserReceivedMessage;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\ContactedUserResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\MessagesCollection;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function dialogs(Request $request)
    {
        return ContactedUserResource::collection($request->user()->getContactedUsers());
    }

    public function index(Request $request, User $user)
    {
        return new MessagesCollection($request->user()->getMessagesWithUser($user->id)->paginate(15), $user);
    }

    public function create(User $user, SendMessageRequest $request)
    {
        $newMessage = $request->user()->sendMessage($user->id, $request->text);
        event(new UserReceivedMessage($newMessage, class_basename($this)));
        return new MessageResource($newMessage);
    }
}
