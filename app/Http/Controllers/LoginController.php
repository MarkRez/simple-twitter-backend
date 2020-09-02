<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Cassandra\Exception\ValidationException;
use App\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function token(LoginRequest $request) {
        $user = User::where('login', $request->login)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
                return response('Invalid login or password', 401)
                    ->header('Content-Type', 'text/plain');
        }

        return $user->createToken($request->login)->plainTextToken;
    }
}
