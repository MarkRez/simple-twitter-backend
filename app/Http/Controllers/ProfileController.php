<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Services\FileUploadService;
use Faker\Provider\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function index() {
        $user = Auth::user();

        return [
            'email' => $user->email,
            'login' => $user->login,
            'name' => $user->name,
            'id' => $user->id,
            'avatar' => $user->avatar
        ];
    }

    public function update(ProfileUpdateRequest $request) {
        $user = Auth::user();

        if ($request->has('avatar')) {
            $path = FileUploadService::uploadAvatar($request->avatar);
            $user->avatar = $path;
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
