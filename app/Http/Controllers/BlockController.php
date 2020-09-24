<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function store(User $user, Request $request)
    {
        $request->user()->addBlockedUser($user->id);

        return new UserResource($user);
    }

    public function destroy(User $user, Request $request)
    {
        $request->user()->removeBlockedUser($user->id);

        return new UserResource($user);
    }
}
