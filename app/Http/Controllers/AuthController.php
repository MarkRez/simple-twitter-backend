<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\TokenResource;
use App\Models\ConfirmationToken;
use App\Models\User;
use App\Services\MailService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
            return new TokenResource($user->createToken($request->login));
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
        ]);

        return response('User created', 200);
    }

    public function verifyEmail(Request $request)
    {
        $token = ConfirmationToken::where('token', $request->token)->first();

        if ($token) {
            $token->user()->update([
                'email_verified' => true,
            ]);

            $token->delete();

            return response('Email confirmed successfully!', 200);
        }

        return abort(400, 'Invalid token or user already verified!');
    }

    public function logOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }
}
