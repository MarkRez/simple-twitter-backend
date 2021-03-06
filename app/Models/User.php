<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $fillable = ['name', 'email', 'login', 'password', 'email_verified'];
    protected $hidden = [
        'email', 'password', 'remember_token', 'updated_at', 'created_at', 'laravel_through_key'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function emailVerificationToken()
    {
        return $this->hasOne(ConfirmationToken::class)->where('token_type', ConfirmationToken::TYPE_CONFIRM_EMAIL);
    }

    public function passwordResetToken()
    {
        return $this->hasOne(ConfirmationToken::class)->where('token_type', ConfirmationToken::TYPE_CHANGE_PASSWORD);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function latestPosts()
    {
        return $this->posts()->latest();
    }

    public function dialogs()
    {
        return $this->belongsToMany(Dialog::class);
    }

    public function notEmptyDialogs()
    {
        return $this->dialogs()->has('messages');
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function getDialogWithUser($userId)
    {
        $dialog = $this->dialogs()->whereHas('users', function (Builder $query) use ($userId) {
            $query->where('user_id', $userId);
        })->has('users', '=', 2)->first();

        if (!$dialog) {
            $dialog = $this->startDialog($userId);
        }

        return $dialog->id;
    }

    public function startDialog($userId)
    {
        $dialog = Dialog::create();
        $dialog->users()->attach([$this->id, $userId]);
        return $dialog;
    }

    public function sendMessage($dialog, $text)
    {
        $message = $this->sentMessages()->make([
            'text' => $text
        ]);

        $dialog->messages()->save($message);

        return $message;
    }

    public function interestedPosts()
    {
        return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followings', 'lead_id', 'follower_id');
    }

    public function leads()
    {
        return $this->belongsToMany(User::class, 'followings', 'follower_id', 'lead_id');
    }

    public function blockedUsers()
    {
        return $this->belongsToMany(User::class, 'blocked_users', 'user_id', 'blocked_user_id');
    }

    public function addNewPost($postText)
    {
        return $this->posts()->create([
            'text' => $postText,
        ]);
    }

    public function hasFollowedUser($userId)
    {
        $follow = $this->leads()->where('lead_id', $userId)->first();

        return (bool)$follow;
    }

    public function hasBlockedUser($userId)
    {
        $block = $this->blockedUsers()->where('blocked_user_id', $userId)->first();

        return (bool)$block;
    }

    static public function getByLogin($login)
    {
        return self::where('login', $login)->first();
    }

    static public function getByEmail($email)
    {
        return self::where('email', $email)->first();
    }

    public function addFollower($followerId)
    {
        $this->followers()->syncWithoutDetaching($followerId);
    }

    public function removeFollower($followerId)
    {
        $this->followers()->detach($followerId);
    }

    public function addBlockedUser($userId)
    {
        $this->blockedUsers()->syncWithoutDetaching($userId);
    }

    public function removeBlockedUser($userId)
    {
        $this->blockedUsers()->detach($userId);
    }

    /**
     * Create a new personal access token for the user.
     *
     * @param string $name
     * @param array $abilities
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function createToken(string $name, array $abilities = ['*'])
    {
        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken = Str::random(400)),
            'abilities' => $abilities,
        ]);

        return new NewAccessToken($token, $plainTextToken);
    }
}
