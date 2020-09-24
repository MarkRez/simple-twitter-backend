<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function store(User $user, Request $request)
    {
        $user->addFollower($request->user()->id);

        return new UserResource($user);
    }

    public function destroy(User $user, Request $request)
    {
        $user->removeFollower($request->user()->id);

        return new UserResource($user);
    }
}
