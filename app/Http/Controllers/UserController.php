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
}
