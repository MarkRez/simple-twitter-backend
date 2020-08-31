<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index() {
        return "messages";
    }

    public function show($id) {
        return "dialog with $id user";
    }

    public function sendMessage($id, Request $request) {
        return "message to $id";
    }
}
