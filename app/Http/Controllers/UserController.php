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
        return $user;
    }
}
