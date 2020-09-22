<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendMessageRequest;
use App\Models\User;

class MessageController extends Controller
{
    public function dilogs() {
        return "dialogs";
    }

    public function index(User $user) {
        return "messages from one dialog";
    }

    public function create(User $user, SendMessageRequest $request) {
        return "Send message";
    }
}
