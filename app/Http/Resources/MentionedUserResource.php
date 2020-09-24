<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MentionedUserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'login' => $this->login,
        ];
    }
}
