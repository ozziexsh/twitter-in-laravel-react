<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\UserProfileViewData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FollowerController extends Controller
{
  public function index(User $user)
  {
    return Inertia::render(
      'Users/Followers',
      UserProfileViewData::prepare($user)
    );
  }

  public function store(Request $request, User $user)
  {
    $request->user()->follow($user);
    return response()->json();
  }

  public function destroy(Request $request, User $user)
  {
    $request->user()->unfollow($user);
    return response()->json();
  }
}
