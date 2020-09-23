<?php

namespace App\Models;

use App\Traits\MentionTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use MentionTrait;
    protected $fillable = ['text'];
    protected $appends = ['liked'];
    protected $with = ['user', 'mentionedUsers:users.id,users.login', 'tags'];
    protected $withCount = ['likes', 'dislikes', 'comments'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reactions()
    {
        return $this->hasMany(Like::class);
    }

    public function likes()
    {
        return $this->reactions()->where('liked', true);
    }

    public function dislikes()
    {
        return $this->reactions()->where('liked', false);
    }

    public function getLikedAttribute()
    {
        $like = $this->reactions()->where('user_id', Auth::id())->first();

        return $like ? (bool) $like->liked : null;
    }

    public function getLikeByUser($userId)
    {
        return $this->reactions()->where('user_id', $userId);
    }

    static public function checkAuthor ($userId) {

        return $userId === Auth::id();
    }

}
