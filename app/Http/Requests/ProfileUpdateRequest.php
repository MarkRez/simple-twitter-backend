<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'password' => 'filled|string|min:4|max:35|confirmed',
            'currentPassword' => 'required_if:password, true|min:4|max:35|string',
            'name' => 'required|min:3|max:50|string',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore(Auth::id(), 'id')
            ],
        ];
    }
}
