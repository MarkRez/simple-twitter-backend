<?php

namespace App;

use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $fillable = ['text'];
    protected $appends = ['liked', 'likes_count', 'dislikes_count', 'comments_count'];
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class)->with('user');
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function getLikedAttribute($value)
    {
        $currentUserId = Auth::id();
        $like = $this->likes()->where('user_id', $currentUserId)->first();

        if (!$like) {
            return null;
        }

        return !!$like->liked;
    }

    public function getLikesCountAttribute()
    {
        return $this->likes()->where('liked', true)->count();
    }

    public function getDislikesCountAttribute()
    {
        return $this->likes()->where('liked', false)->count();
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }
}
