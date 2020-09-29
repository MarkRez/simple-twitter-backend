<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MessagesCollection extends ResourceCollection
{
    private $user;

    public function __construct($resource, $user)
    {
        parent::__construct($resource);
        $this->user = $user;
    }

    public function toArray($request)
    {
        return [
            'data' => MessageResource::collection($this->collection),
            'user' => new ShortUserResource($this->user)
        ];
    }
}
