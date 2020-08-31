<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function get () {
        return "feed";
    }

    public function getFromFollowings() {
        return "feed from followings";
    }
}
