<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'login' => 'required|min:4|max:35|unique:users|string',
            'password' => 'required|min:4|max:35|confirmed|string',
            'name' => 'required|min:3|max:50|string',
            'email' => 'required|email|unique:users',

        ];
    }
}
