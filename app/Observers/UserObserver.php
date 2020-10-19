<?php

namespace App\Observers;

use App\Models\User;
use App\Services\MailService;
use Illuminate\Support\Str;

class UserObserver
{
    public function saved(User $user)
    {
        $token = $user->emailVerificationToken()->create([
            'token' => Str::random(32),
            'token_type' => 'confirm_email',
        ]);

        MailService::sendEmailVerificationToken($user->email, $token->token);
    }
}
