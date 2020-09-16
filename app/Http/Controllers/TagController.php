<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $tags = [];
        if ($request->name) {
            $tags = Tag::where('name', 'LIKE', "%$request->name%")->take(5)->get();
        }

        return $tags;
    }
}
