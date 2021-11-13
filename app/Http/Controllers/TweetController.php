<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TweetController extends Controller
{
  public function index(Request $request)
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
      ->latest()
      ->get();
    return Inertia::render('Home', [
      'tweets' => $tweets,
    ]);
  }

  public function show(Tweet $tweet)
  {
    return Inertia::render('Tweets/Show', [
      'tweet' => Tweet::withFeedData()->find($tweet->id),
    ]);
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'body' => ['required', 'string', 'max:280'],
    ]);

    $tweet = $request
      ->user()
      ->tweets()
      ->create($data);

    return response()->json([
      'tweet' => $tweet,
    ]);
  }
}
