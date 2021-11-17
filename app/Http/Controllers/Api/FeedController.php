<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use Illuminate\Http\Request;

class FeedController extends Controller
{
  public function __invoke(Request $request)
  {
    $ids = array_merge(
      [$request->user()->id],
      $request
        ->user()
        ->following()
        ->pluck('user_id')
        ->all()
    );
    $tweets = Tweet::query()
      ->whereIn('user_id', $ids)
      ->withFeedData()
      ->orderBy('id', 'DESC')
      ->cursorPaginate(25);

    return response()->json([
      'feed' => $tweets,
    ]);
  }
}
