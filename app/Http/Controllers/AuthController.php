<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $user = User::getByLogin($request->login);

        if (!$user || !Hash::check($request->password, $user->password)) {
            return abort(401, 'Invalid login or password');
        }

        return $user->createToken($request->login)->plainTextToken;
    }

    public function register(RegisterRequest $request) {
        User::create([
            'login' => $request->login,
            'email' => $request->email,
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email_verification_token' => Str::random(15)
        ]);

        return response('User created', 200);
    }

    public function logOut (Request $request) {
        $request->user()->currentAccessToken()->delete();
    }
}
