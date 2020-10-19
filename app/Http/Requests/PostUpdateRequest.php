<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PostUpdateRequest extends FormRequest
{
    public function authorize(Request $request)
    {
        return Gate::allows('update-post', $this->route('post'));
    }

    public function rules()
    {
        return [
            'text' => 'required|string',
            'tags' => 'array|max:3'
        ];
    }
}
