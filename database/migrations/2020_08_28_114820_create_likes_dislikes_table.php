<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikesDislikesTable extends Migration
{
    public function up()
    {
        Schema::create('likes_dislikes', function (Blueprint $table) {
            $table->foreignId('post_id');
            $table->foreignId('user_id');
            $table->tinyInteger('liked');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('likes_dislikes');
    }
}
