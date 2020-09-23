<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class PostUpdateRequest extends FormRequest
{
    public function authorize(Request $request)
    {
        $postCreatorId = $this->route('post')->user_id;
        return Post::checkAuthor($postCreatorId);
    }

    public function rules()
    {
        return [
            'text' => 'required|string',
            'tags' => 'array|max:3'
        ];
    }
}
