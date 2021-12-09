<?php

namespace App\Support;

use App\Models\User;

class UserProfileViewData
{
  public static function prepare(User $user, $data = [])
  {
    return array_merge(
      [
        'profile' => $user,
        'followers_count' => $user->followers()->count(),
        'following_count' => $user->following()->count(),
        'following' => request()->user()?->isFollowing($user),
        'tweets_count' => $user->tweets()->count(),
      ],
      $data
    );
  }
}
