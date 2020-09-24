<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'text' => $this->text,
            'created_at' => $this->created_at,
            'mentioned_users' => MentionedUserResource::collection($this->mentionedUsers),
        ];
    }
}
