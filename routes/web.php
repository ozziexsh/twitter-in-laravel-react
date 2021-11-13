<?php

use App\Http\Controllers\FollowerController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
  Route::get('/home', [TweetController::class, 'index'])->name('home');

  Route::post('tweets', [TweetController::class, 'store'])->name(
    'tweets.store'
  );
  Route::post('tweets/{tweet}/like', [LikeController::class, 'store'])->name(
    'tweets.likes.store'
  );
  Route::delete('tweets/{tweet}/like', [
    LikeController::class,
    'destroy',
  ])->name('tweets.likes.destroy');

  Route::post('users/{user}/followers', [
    FollowerController::class,
    'store',
  ])->name('users.followers.store');
  Route::delete('users/{user}/followers', [
    FollowerController::class,
    'destroy',
  ])->name('users.followers.destroy');
});

Route::get('tweets/{tweet}', [TweetController::class, 'show'])->name(
  'tweets.show'
);

Route::get('{user:username}', [UserController::class, 'show'])->name(
  'users.show'
);
