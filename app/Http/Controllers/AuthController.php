<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request) { // TODO отдать существующий токен
        $user = User::where('login', $request->login)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return abort(401, 'Invalid login or password');
        }

        return $user->createToken($request->login)->plainTextToken;
    }

    public function register(RegisterRequest $request) {
        $user = new User();
        $user->login = $request->login;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        return $user->save();

    }

    public function logOut (Request $request) {
        $request->user()->currentAccessToken()->delete();
    }
}
