<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\RequestPasswordResetRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Http\Resources\TokenResource;
use App\Models\ConfirmationToken;
use App\Models\User;
use App\Services\MailService;
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

    public function logOut(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }

    public function verifyEmail(ConfirmationToken $confirmationToken)
    {
        $confirmationToken->user()->update([
            'email_verified' => true,
        ]);
        $confirmationToken->delete();

        return response('Email confirmed successfully!', 200);
    }

    public function requestPasswordReset(RequestPasswordResetRequest $request)
    {
        $user = User::getByEmail($request->email);
        $token = $user->passwordResetToken()->create([
            'token' => Str::random(32),
            'token_type' => ConfirmationToken::TYPE_CHANGE_PASSWORD,
        ]);

        MailService::sendPasswordResetLink($user->email, $token->token);

        return response(200);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $token = ConfirmationToken::findToken($request->token, ConfirmationToken::TYPE_CHANGE_PASSWORD);
        $token->user()->update([
            'password' => Hash::make($request->password),
        ]);
        $token->delete();

        return response('Password reset successfully!', 200);
    }
}
