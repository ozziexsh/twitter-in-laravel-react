<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\UserProfileViewData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserLikeController extends Controller
{
  public function index(User $user)
  {
    return Inertia::render('Users/Likes', UserProfileViewData::prepare($user));
  }
}
