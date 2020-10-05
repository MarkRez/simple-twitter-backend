<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Dialog extends Model
{
    public $timestamps = false;

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function dialogUsers()
    {
        return $this->users()->where('id', '!=', Auth::id())->get();
    }

    public function lastMessage()
    {
        return $this->messages()->take(1)->latest()->first();
    }
}
