<?php

namespace App\Http\Requests;

use App\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostUpdateRequest extends FormRequest
{
    public function authorize()
    {
        $post = $this->route('post');
        $userId = Auth::id();

        return $userId === $post->user_id;
    }

    public function rules()
    {
        return [
            'text' => 'required|string',
        ];
    }
}
