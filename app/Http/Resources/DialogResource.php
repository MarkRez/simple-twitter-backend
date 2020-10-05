<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DialogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'id' => $this->id,
            'user' => new ShortUserResource($this->dialogUsers()->first()),
            'last_message' => $this->lastMessage()->text,
        ];
    }
}
