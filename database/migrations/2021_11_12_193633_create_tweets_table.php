<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTweetsTable extends Migration
{
  public function up()
  {
    Schema::create('tweets', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table
        ->foreign('user_id')
        ->references('id')
        ->on('users')
        ->cascadeOnDelete();
      $table->text('body');
      $table->timestamps();
    });
  }

  public function down()
  {
    Schema::dropIfExists('tweets');
  }
}
