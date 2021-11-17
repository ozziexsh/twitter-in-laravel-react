<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;

class LikeController extends Controller
{
  public function index(User $user)
  {
    return response()->json([
      'feed' => $user
        ->likedTweets()
        ->withFeedData()
        ->orderBy('likes.created_at', 'DESC')
        ->cursorPaginate(25),
    ]);
  }

  public function store(Request $request, Tweet $tweet)
  {
    $request->user()->like($tweet);
    return response()->json();
  }

  public function destroy(Request $request, Tweet $tweet)
  {
    $request->user()->unlike($tweet);
    return response()->json();
  }
}
