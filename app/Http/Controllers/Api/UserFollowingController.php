<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserFollowingController extends Controller
{
  public function __invoke(Request $request, User $user)
  {
    return response()->json([
      'feed' => $user
        ->following()
        ->latest()
        ->cursorPaginate(25),
    ]);
  }
}
