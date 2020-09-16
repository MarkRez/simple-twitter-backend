<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['text', 'user_id'];
    protected $with = ['user', 'mentionedUsers:users.id,users.login'];

    public function posts() {
        return $this->belongsTo(Post::Class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function mentions()
    {
        return $this->morphMany(Mention::class, 'mentionable');
    }

    public function mentionedUsers() {
        return $this->hasManyThrough(User::class,
            Mention::class,
            'mentionable_id',
            'id',
            'id',
            'user_id')->where('mentionable_type', 'App\Models\Comment');
    }
}
