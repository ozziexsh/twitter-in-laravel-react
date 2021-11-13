<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  public function show(Request $request, User $user)
  {
    return Inertia::render('Users/Show', [
      'profile' => $user,
      'followers_count' => $user->followers()->count(),
      'following_count' => $user->following()->count(),
      'tweets' => $user
        ->tweets()
        ->withFeedData()
        ->latest()
        ->get(),
      'following' => $request->user()->isFollowing($user),
    ]);
  }
}
