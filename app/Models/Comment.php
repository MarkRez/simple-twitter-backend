<?php

namespace App\Models;

use App\Traits\MentionTrait;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use MentionTrait;
    protected $fillable = ['text'];

    public function posts() {
        return $this->belongsTo(Post::Class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
