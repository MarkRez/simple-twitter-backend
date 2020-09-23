<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function store(User $user, Request $request)
    {
        $user->followers()->syncWithoutDetaching($request->user()->id);

        return $user;
    }

    public function destroy(User $user, Request $request)
    {
        $user->followers()->detach($request->user()->id);

        return $user;
    }
}
