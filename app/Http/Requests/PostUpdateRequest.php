<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class PostUpdateRequest extends FormRequest
{
    public function authorize(Request $request)
    {
        return true;
    }

    public function rules()
    {
        return [
            'text' => 'required|string',
            'tags' => 'array|max:3'
        ];
    }
}
