<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikesTable extends Migration
{
  public function up()
  {
    Schema::create('likes', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('tweet_id');
      $table
        ->foreign('tweet_id')
        ->references('id')
        ->on('tweets')
        ->cascadeOnDelete();
      $table->unsignedBigInteger('user_id');
      $table
        ->foreign('user_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->timestamps();

      $table->unique(['tweet_id', 'user_id']);
    });
  }

  public function down()
  {
    Schema::dropIfExists('likes');
  }
}
