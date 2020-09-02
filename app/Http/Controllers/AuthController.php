<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Cassandra\Exception\ValidationException;
use App\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $user = User::where('login', $request->login)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return abort(401, 'Invalid login or password');
        }

        return $user->createToken($request->login)->plainTextToken;
    }

    public function register(RegisterRequest $request) {
        return User::create([
            'login' => $request->login,
            'email' => $request->email,
            'name' => $request->name,
            'password' => Hash::make($request->password)
        ]);
    }
}
