<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;

class CheckBlockedUser
{
    public function handle($request, Closure $next)
    {
        $user = $request->route('user');
        if (User::getUserBlocked($user->id) && $user->id !==  $request->user()->id) {
            return response('User blocked you!', 403);
        }

        return $next($request);
    }
}
