<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => 'filled|string|min:4|max:35|confirmed',
            'currentPassword' => 'required_if:password, true|min:4|max:35',
            'name' => 'required|min:3|max:50',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore(Auth::id(), 'id')
            ],
        ];
    }
}
