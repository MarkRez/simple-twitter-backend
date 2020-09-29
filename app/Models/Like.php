<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = ['liked'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
