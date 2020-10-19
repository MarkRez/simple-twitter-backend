<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConfirmationToken extends Model
{
    protected $fillable = ['token', 'token_type'];

    public function setUpdatedAt($value)
    {
        return $this;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
