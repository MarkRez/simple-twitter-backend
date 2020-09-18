<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockedUsersTable extends Migration
{
    public function up()
    {
        Schema::create('blocked_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('blocked_user_id')->constrained('users');
            $table->timestamps();

            $table->unique(['user_id', 'blocked_user_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('blocked_users');
    }
}
