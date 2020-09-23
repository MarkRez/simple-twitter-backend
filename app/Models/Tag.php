<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['tag_id'];
    protected $hidden = ['created_at', 'updated_at', 'pivot'];
    public function posts() {
        return $this->belongsToMany(Post::Class);
    }

    static public function getTagsByName($name, $numberOfTags)
    {
        return Tag::where('name', 'LIKE', "%$name%")->take($numberOfTags)->get();
    }
}
