<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index() {
        $user = Auth::user();

        return [
            'email' => $user->email,
            'login' => $user->login,
            'name' => $user->name,
            'id' => $user->id,
            'avatar' => $user->avatar
        ];
    }
}
