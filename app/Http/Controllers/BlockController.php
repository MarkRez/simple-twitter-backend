<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BlockController extends Controller
{
    public function store(User $user)
    {
        Auth::user()->blocked()->syncWithoutDetaching($user->id);

        return $user;
    }

    public function destroy(User $user)
    {
        Auth::user()->blocked()->detach($user->id);

        return $user;
    }
}
