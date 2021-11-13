<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
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
