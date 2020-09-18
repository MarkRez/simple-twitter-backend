<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function store(User $user)
    {
        $user->followers()->syncWithoutDetaching(Auth::id());

        return $user;
    }

    public function destroy(User $user)
    {
        $user->followers()->detach(Auth::id());

        return $user;
    }
}
