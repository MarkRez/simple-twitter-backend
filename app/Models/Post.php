<?php

namespace App\Models;

use App\Traits\MentionTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use MentionTrait;

    protected $fillable = ['text'];

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
        return $this->hasMany(Comment::class)->latest();
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

    public function getLiked()
    {
        $like = $this->reactions()->where('user_id', Auth::id())->first();

        return $like ? (bool)$like->liked : null;
    }

    public function getReactionByUser($userId)
    {
        return $this->reactions()->where('user_id', $userId);
    }

    public function checkAuthor($userId)
    {
        return $this->user_id === $userId;
    }

    static public function getPostsFromFollowed($leadIds)
    {
        return self::whereIn('user_id', $leadIds)->latest();
    }

    public function addReaction($userId, $reactionType)
    {
        $this->reactions()->updateOrCreate(
            [
                'user_id' => $userId
            ],
            [
                'liked' => $reactionType,
            ]);
    }

    public function removeReaction($userId)
    {
        $this->getReactionByUser($userId)->delete();
    }

    public function setTags($tags)
    {
        $this->tags()->sync(array_map(function ($tag) {
                return ['tag_id' => $tag['id']];
            }, $tags)
        );
    }
}
