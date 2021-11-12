<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TweetController extends Controller
{
  public function index(Request $request)
  {
    return Inertia::render('Home', [
      'tweets' => $request
        ->user()
        ->tweets()
        ->with('user')
        ->latest()
        ->get(),
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
