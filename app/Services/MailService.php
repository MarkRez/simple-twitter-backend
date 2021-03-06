<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class MailService
{
    static public function sendEmailVerificationToken($userEmail, $userToken) {

        Mail::send('emailVerification', ['token' => $userToken],
            function ($message) use ($userEmail) {
                $message->subject('Simple Twitter email verification!');
                $message->to($userEmail);
            });
    }

    static public function sendPasswordResetLink($userEmail, $userToken) {

        Mail::send('passwordReset', ['token' => $userToken],
            function ($message) use ($userEmail) {
                $message->subject('Simple Twitter password reset!');
                $message->to($userEmail);
            });
    }
}
