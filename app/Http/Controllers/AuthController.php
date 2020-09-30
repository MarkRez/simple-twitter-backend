<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('login', 'password');

        if (Auth::attempt($credentials)) {
            $user = User::getByLogin($request->login);
            return $user->createToken($request->login)->plainTextToken;
        }

            return abort(401, 'Invalid login or password');
    }

    public function register(RegisterRequest $request)
    {
        User::create([
            'login' => $request->login,
            'email' => $request->email,
            'name' => $request->name,
            'password' => Hash::make($request->password),
            'email_verification_token' => Str::random(15)
        ]);

        return response('User created', 200);
    }

    public function verifyEmail(Request $request)
    {
        $user = User::getByVerificationToken($request->token);

        if ($user) {
            $user->update([
                'email_verification_token' => NULL,
                'email_verified' => true,
            ]);

            return 'Email confirmed successfully!';
        }

        return 'Invalid token or user already verified!';
    }

    public function logOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }
}
