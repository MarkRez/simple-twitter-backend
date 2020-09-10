<?php

namespace App\Services;

class FileUploadService
{
    static public function uploadAvatar($avatar) {

        if (is_file($avatar)) {
            return '/storage/' . $avatar->store('avatars', 'public');
        } else {
            return '/storage/avatars/default.jpg';
        }
    }
}
