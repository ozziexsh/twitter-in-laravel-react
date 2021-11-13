<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class LikeController extends Controller
{
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
