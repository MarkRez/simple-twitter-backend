<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class PostUpdateRequest extends FormRequest
{
    public function authorize(Request $request)
    {
        return $this->route('post')->checkAuthor($request->user()->id);
    }

    public function rules()
    {
        return [
            'text' => 'required|string',
            'tags' => 'array|max:3'
        ];
    }
}
