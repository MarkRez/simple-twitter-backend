<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->name) {
            return TagResource::collection(Tag::getTagsByName($request->name, 5));
        }
    }
}
