<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mention extends Model
{
    public function mentionable()
    {
        return $this->morphTo();
    }
}
