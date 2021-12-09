<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserSummaryController extends Controller
{
  /**
   * Handle the incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function __invoke(Request $request, User $user)
  {
    return response()->json([
      'user' => $user,
      'followers_count' => $user->followers()->count(),
      'following_count' => $user->following()->count(),
      'is_following' => $request->user()?->isFollowing($request->user()),
    ]);
  }
}
