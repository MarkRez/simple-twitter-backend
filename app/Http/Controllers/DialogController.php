<?php

namespace App\Http\Controllers;
use App\Http\Resources\DialogResource;
use Illuminate\Http\Request;

class DialogController extends Controller
{
    public function __invoke(Request $request)
    {
        return DialogResource::collection($request->user()->dialogs);
    }
}
