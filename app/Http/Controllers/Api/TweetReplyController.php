<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetReplyController extends Controller
{
  public function __invoke(Request $request, Tweet $tweet)
  {
    $data = $request->validate([
      'body' => ['required', 'string', 'max:280'],
    ]);

    $tweet = $tweet
      ->replies()
      ->create(array_merge($data, ['user_id' => $request->user()->id]));

    return response()->json([
      'tweet' => Tweet::withFeedData()->find($tweet->id),
    ]);
  }
}
