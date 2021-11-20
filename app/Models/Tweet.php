<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function likes()
  {
    return $this->hasMany(Like::class);
  }

  public function liked()
  {
    return $this->likes();
  }

  public function replies()
  {
    return $this->hasMany(Tweet::class, 'parent_id');
  }

  public function scopeWithFeedData(Builder $query)
  {
    return $query
      ->with('user')
      ->withCount('likes')
      ->withCount('replies')
      ->selectRaw(
        '(SELECT count(*) > 0 FROM likes WHERE tweets.id = likes.tweet_id AND likes.user_id = ?) AS liked',
        [auth()->id() ?? -1]
      );
  }
}
