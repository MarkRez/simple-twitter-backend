<?php

namespace App\Http\Requests;

use App\Models\ConfirmationToken;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
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
            'token' => [
                'required',
                Rule::exists('confirmation_tokens')->where(function ($query) {
                    $query->where('token_type', ConfirmationToken::TYPE_CHANGE_PASSWORD);
                }),
            ],
        ];
    }
}
