<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DialogUser extends Migration
{
    public function up()
    {
        Schema::create('dialog_user', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('dialog_id')->constrained()->onDelete('cascade');

            $table->index(['user_id', 'dialog_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('dialog_user');
    }
}
