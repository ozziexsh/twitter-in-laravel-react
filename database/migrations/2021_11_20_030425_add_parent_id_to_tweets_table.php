<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddParentIdToTweetsTable extends Migration
{
  public function up()
  {
    Schema::table('tweets', function (Blueprint $table) {
      $table->unsignedBigInteger('parent_id')->nullable();
      $table
        ->foreign('parent_id')
        ->references('id')
        ->on('tweets')
        ->cascadeOnDelete()
        ->nullable();
    });
  }

  public function down()
  {
    Schema::table('tweets', function (Blueprint $table) {
      $table->dropForeign(['parent_id']);
      $table->dropColumn('parent_id');
    });
  }
}
