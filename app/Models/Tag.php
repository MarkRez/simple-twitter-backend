<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function posts() {
        return $this->belongsToMany(Post::Class);
    }

    static public function getByName($name, $numberOfTags)
    {
        return Tag::where('name', 'LIKE', "%$name%")->take($numberOfTags)->get();
    }
}
