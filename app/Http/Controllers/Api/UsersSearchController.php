<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UsersSearchController extends Controller
{
  public function __invoke(Request $request)
  {
    return response()->json([
      'users' => User::where(
        'username',
        'ilike',
        '%' . $request->get('q') . '%'
      )
        ->limit(5)
        ->get(),
    ]);
  }
}
