<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserTweetController extends Controller
{
  public function __invoke(User $user)
  {
    return response()->json([
      'feed' => $user
        ->tweets()
        ->withFeedData()
        ->orderBy('id', 'DESC')
        ->cursorPaginate(25),
    ]);
  }
}
