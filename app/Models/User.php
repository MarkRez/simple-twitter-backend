<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\NewAccessToken;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $fillable = ['name', 'email', 'login', 'password'];
    protected $hidden = [
        'email', 'password', 'remember_token', 'updated_at', 'created_at', 'laravel_through_key'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class)->latest();
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'recipient_id');
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

    public function getContactedUsers()
    {
        $recipientIds = array_column(
            $this->sentMessages()
                ->distinct()
                ->get('recipient_id')
                ->toArray(), 'recipient_id');
        $senderIds = array_column(
            $this->receivedMessages()
                ->distinct()
                ->get('sender_id')
                ->toArray(), 'sender_id');

        $contactedUsersIds = array_unique(array_merge($recipientIds, $senderIds));

        return self::whereIn('id', $contactedUsersIds)->get();
    }

    public function getMessagesWithUser($userId)
    {
        return Message::whereIn('sender_id', [$this->id, $userId])
            ->whereIn('recipient_id', [$this->id, $userId])
            ->latest();
    }

    public function getLastMessageWithUser($userId)
    {
        return self::getMessagesWithUser($userId)->select('text')->take(1)->first()->text;
    }

    public function sendMessage($userId, $text)
    {
        return $this->sentMessages()->create([
            'recipient_id' => $userId,
            'text' => $text
        ]);
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
