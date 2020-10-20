<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConfirmationToken extends Model
{
    protected $fillable = ['token', 'token_type'];

    const TYPE_CHANGE_PASSWORD = 'change_password';
    const TYPE_CONFIRM_EMAIL = 'confirm_email';

    public function setUpdatedAt($value)
    {
        return $this;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    static public function findToken($token, $type)
    {
        return ConfirmationToken::where('token', $token)->where('token_type', $type)->firstOrFail();
    }
}
