<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\ProfileResource;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index(Request $request) {
        return new ProfileResource($request->user());
    }

    public function update(ProfileUpdateRequest $request) {
        $user = $request->user();

        if ($request->has('avatar')) {
            $user->avatar = FileUploadService::uploadAvatar($request->avatar);
        }

        if ($request->has('password')) {
            if (! $user || ! Hash::check($request->currentPassword, $user->password)) {
                return abort(401, 'Invalid password');
            }
            $user->password = Hash::make($request->password);
        }

        $user->email = $request->email;
        $user->name = $request->name;
        return $user->save();
    }
}
