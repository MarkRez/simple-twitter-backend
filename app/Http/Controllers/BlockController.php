<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class BlockController extends Controller
{
    public function store(User $user, Request $request)
    {
        $request->user()->blockedUsers()->syncWithoutDetaching($user->id);

        return $user;
    }

    public function destroy(User $user, Request $request)
    {
        $request->user()->blockedUsers()->detach($user->id);

        return $user;
    }
}
