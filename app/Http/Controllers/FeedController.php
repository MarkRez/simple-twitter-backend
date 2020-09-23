<?php

namespace App\Http\Controllers;

use App\Models\Feed;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    public function get(Request $request) {
        $user = $request->user();

        $leadIds = $user->leads->pluck('id');

        $feed = Feed::getPostsFromFollowed($leadIds)->paginate(15);

        return $feed;
    }
}
