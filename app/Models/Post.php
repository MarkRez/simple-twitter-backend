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

    public function reactedUsers()
    {
        return $this->belongsToMany(User::class, 'likes', 'post_id', 'user_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function latestComments()
    {
        return $this->comments()->latest();
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

    public function addComment($commentText)
    {
        $comment = Auth::user()->comments()->make([
            'text' => $commentText,
        ]);

        $this->comments()->save($comment);

        return $comment;
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

    public function setReaction($userId, $reactionType)
    {
        $this->reactedUsers()->syncWithoutDetaching([$userId => ['liked' => $reactionType]]);
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
