<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $fillable = ['text'];
    protected $appends = ['liked'];
    protected $with = ['user'];
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
}