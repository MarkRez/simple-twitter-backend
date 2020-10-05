<?php

namespace App\Http\Controllers;
use App\Http\Resources\DialogResource;
use App\Models\User;
use Illuminate\Http\Request;

class DialogController extends Controller
{
    public function index(Request $request)
    {
        return DialogResource::collection($request->user()->dialogs);
    }

    public function getDialogId(Request $request, User $user)
    {
        return $request->user()->getDialogWithUser($user->id);
    }
}
