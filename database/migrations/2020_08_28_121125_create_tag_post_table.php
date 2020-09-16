<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagPostTable extends Migration
{
    public function up()
    {
        Schema::create('tag_post', function (Blueprint $table) {
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            $table->foreignId('tag_id')->constrained();
            $table->timestamps();

            $table->index(['post_id', 'tag_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('tag_post');
    }
}
