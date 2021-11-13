<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowsTable extends Migration
{
  public function up()
  {
    Schema::create('follows', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('follower_id');
      $table
        ->foreign('follower_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->unsignedBigInteger('user_id');
      $table
        ->foreign('user_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->timestamps();

      $table->unique(['follower_id', 'user_id']);
    });
  }

  public function down()
  {
    Schema::dropIfExists('follows');
  }
}
