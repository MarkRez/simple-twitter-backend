<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BlockController extends Controller
{
    public function store(User $user)
    {
        $user->blocked()->syncWithoutDetaching(Auth::id());

        return $user;
    }

    public function destroy(User $user)
    {
        $user->blocked()->detach(Auth::id());

        return $user;
    }
}
