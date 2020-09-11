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
        'name', 'email', 'login',
    ];
    protected $appends = ['followed', 'followings_count', 'followers_count'];

    protected $hidden = [
        'email', 'password', 'remember_token', 'updated_at', 'created_at'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts() {
        return $this->hasMany(Post::class);
    }


    // подписчики
    public function followers() {
        return $this->belongsToMany(User::class, 'followings', 'lead_id', 'follower_id');
    }

    // подписки
    public function leads() {
        return $this->belongsToMany(User::class, 'followings', 'follower_id', 'lead_id');
    }

    public function blocked() {
        return $this->belongsToMany(User::class, 'blocked_users', 'user_id', 'blocked_user_id');
    }

    public function getFollowedAttribute($value)
    {
        $currentUserId = Auth::id();
        $follow = $this->followers()->wherePivot('follower_id', $currentUserId)->first();

        return (bool) $follow;
    }

    public function getFollowingsCountAttribute()
    {
        return $this->leads()->count();
    }

    public function getFollowersCountAttribute()
    {
        return $this->followers()->count();
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
}
