<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowingsTable extends Migration
{
    public function up()
    {
        Schema::create('followings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('follower_id')->constrained('users');
            $table->foreignId('lead_id')->constrained('users');
            $table->timestamps();

            $table->unique(['follower_id', 'lead_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('followings');
    }
}
