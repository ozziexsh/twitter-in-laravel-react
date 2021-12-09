<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\UserProfileViewData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  public function show(Request $request, User $user)
  {
    return Inertia::render('Users/Show', UserProfileViewData::prepare($user));
  }

  public function update(Request $request, User $user)
  {
    abort_unless($request->user()->is($user), 401);

    $data = $request->validate([
      'name' => ['required', 'string', 'max:50'],
      'bio' => ['nullable', 'string', 'max:160'],
      'location' => ['nullable', 'string', 'max:30'],
      'website' => ['nullable', 'string', 'url', 'max:60'],
    ]);

    $request
      ->user()
      ->fill($data)
      ->save();

    return redirect()->back();
  }
}
