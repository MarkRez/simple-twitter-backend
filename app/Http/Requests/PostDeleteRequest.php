<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class PostDeleteRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('delete-post', $this->route('post'));
    }

    public function rules()
    {
        return [
            //
        ];
    }
}
