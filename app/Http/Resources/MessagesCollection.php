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
            'data' => $this->collection,
            'user' => new ContactedUserResource($this->user)
        ];
    }
}
