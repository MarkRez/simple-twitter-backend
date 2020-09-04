<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function profile() {
        $user = Auth::user();

        return [
            'email' => $user->email,
            'login' => $user->login,
            'name' => $user->name,
            'id' => $user->id,
            'avatar' => $user->avatar
        ];
    }

    public function index ()
    {
        return 'users list';
    }

    public function show(User $user)
    {
        return $user;
    }

    public function store()
    {
        return 'user added';
    }

    public function update($id) {
        return "user $id updated";
    }

    public function destroy($id) {
        return "user $id deleted";
    }

    public function followUser ($id) {
        return "user $id followed";
    }

    public function blockUser ($id) {
        return "user $id blocked";
    }
}
