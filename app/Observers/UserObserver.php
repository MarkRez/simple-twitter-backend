<?php

namespace App\Observers;

use App\Models\ConfirmationToken;
use App\Models\User;
use App\Services\MailService;
use Illuminate\Support\Str;

class UserObserver
{
    public function created(User $user)
    {
        $token = $user->emailVerificationToken()->create([
            'token' => Str::random(32),
            'token_type' => ConfirmationToken::TYPE_CONFIRM_EMAIL,
        ]);

        MailService::sendEmailVerificationToken($user->email, $token->token);
    }
}
