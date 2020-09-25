<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\ContactedUserResource;
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
        return Message::getDialogMessages($request->user()->id, $user->id)->paginate(15);
    }

    public function create(User $user, SendMessageRequest $request)
    {
        return "Send message";
    }
}
