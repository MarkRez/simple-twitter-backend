<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $fillable = [
        'name', 'email', 'login', 'password'
    ];

    protected $hidden = [
        'email', 'password', 'remember_token', 'updated_at', 'created_at', 'laravel_through_key'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts() {
        return $this->hasMany(Post::class)->latest();
    }

    public function sentMessages() {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages() {
        return $this->hasMany(Message::class, 'recipient_id');
    }

    // подписчики
    public function followers() {
        return $this->belongsToMany(User::class, 'followings', 'lead_id', 'follower_id');
    }

    // подписки
    public function leads() {
        return $this->belongsToMany(User::class, 'followings', 'follower_id', 'lead_id');
    }

    public function blockedUsers() {
        return $this->belongsToMany(User::class, 'blocked_users', 'user_id', 'blocked_user_id');
    }


    public function hasFollowedUser($userId)
    {
        $follow = $this->leads()->where('lead_id', $userId)->first();

        return (bool) $follow;
    }

    public function hasBlockedUser($userId)
    {
        $block = $this->blockedUsers()->where('blocked_user_id', $userId)->first();

        return (bool) $block;
    }

    /**
     * Create a new personal access token for the user.
     *
     * @param  string  $name
     * @param  array  $abilities
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

    public function receivesBroadcastNotificationsOn()
    {
        return 'App.User.' . $this->id;
    }

    static public function getByLogin($login) {
        return self::where('login', $login)->first();
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
}
