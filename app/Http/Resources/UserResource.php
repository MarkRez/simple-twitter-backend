<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'login' => $this->login,
            'name' => $this->name,
            'id' => $this->id,
            'avatar' => $this->avatar,
            'followers_count' => $this->followers()->count(),
            'followings_count' => $this->leads()->count(),
            'followed' => $request->user()->hasFollowedUser($this->id),
            'blocked' => $request->user()->hasBlockedUser($this->id),
        ];
    }
}
