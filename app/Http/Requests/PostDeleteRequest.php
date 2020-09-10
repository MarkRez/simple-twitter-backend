<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostDeleteRequest extends FormRequest
{
    public function authorize(Post $post)
    {
        $postCreatorId = $this->route('post')->user_id;
        $userId = Auth::id();

        return $userId === $postCreatorId;
    }

    public function rules()
    {
        return [
            //
        ];
    }
}
