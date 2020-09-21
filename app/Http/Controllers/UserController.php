<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index ()
    {
        return 'users list';
    }

    public function show(User $user)
    {
        if (Auth::user()->blocked()->wherePivot('user_id', $user->id)->exists() && $user->id !== Auth::id()) {
            return response('User blocked you!', 403);
        }

        return $user;
    }
}
