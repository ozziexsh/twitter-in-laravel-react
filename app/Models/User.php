<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens;
  use HasFactory;
  use Notifiable;
  use TwoFactorAuthenticatable;

  protected $guarded = [];

  protected $hidden = [
    'password',
    'remember_token',
    'two_factor_recovery_codes',
    'two_factor_secret',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  protected $appends = ['profile_photo_path'];

  public function tweets()
  {
    return $this->hasMany(Tweet::class);
  }

  public function likes()
  {
    return $this->belongsToMany(Tweet::class, 'likes');
  }

  public function like(Tweet $tweet)
  {
    if (
      $this->likes()
        ->whereTweetId($tweet->id)
        ->exists()
    ) {
      return;
    }
    $this->likes()->syncWithoutDetaching($tweet);
  }

  public function unlike(Tweet $tweet)
  {
    $this->likes()
      ->whereTweetId($tweet->id)
      ->delete();
  }

  public function followers()
  {
    return $this->belongsToMany(
      User::class,
      'follows',
      'user_id',
      'follower_id'
    );
  }

  public function follow(User $user)
  {
    if ($this->isFollowing($user)) {
      return;
    }
    $this->following()->syncWithoutDetaching([$user->id]);
  }

  public function unfollow(User $user)
  {
    $this->following()->detach($user->id);
  }

  public function following()
  {
    return $this->belongsToMany(
      User::class,
      'follows',
      'follower_id',
      'user_id'
    );
  }

  public function isFollowing(User $user)
  {
    return $this->following()
      ->whereUserId($user->id)
      ->exists();
  }

  public function getProfilePhotoPathAttribute()
  {
    if ($this->profile_photo_url) {
      return asset('storage/' . $this->profile_photo_url);
    }

    return null;
  }
}
