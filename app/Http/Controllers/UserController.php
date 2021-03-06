<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\UserProfileViewData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
      'photo' => ['nullable', 'file', 'mimes:jpg,png,jpeg', 'max:4096'],
      'cover' => ['nullable', 'file', 'mimes:jpg,png,jpeg', 'max:4096'],
    ]);

    if (array_key_exists('photo', $data)) {
      unset($data['photo']);
    }
    if (array_key_exists('cover', $data)) {
      unset($data['cover']);
    }

    if ($request->hasFile('photo')) {
      if ($request->user()->profile_photo_url) {
        Storage::delete($request->user()->profile_photo_url);
      }
      $data['profile_photo_url'] = $request->photo->store(
        'profile-pictures',
        'public'
      );
    }
    if ($request->hasFile('cover')) {
      if ($request->user()->cover_photo_url) {
        Storage::delete($request->user()->cover_photo_url);
      }
      $data['cover_photo_url'] = $request->cover->store(
        'profile-pictures',
        'public'
      );
    }

    $request
      ->user()
      ->fill($data)
      ->save();

    return redirect()->back();
  }
}
