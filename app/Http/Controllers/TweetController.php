<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TweetController extends Controller
{
  public function index()
  {
    return Inertia::render('Home');
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
