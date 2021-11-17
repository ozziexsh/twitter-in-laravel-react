<?php

use App\Http\Controllers\FollowerController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api;
use App\Http\Controllers\UserLikeController;
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
  Route::post('tweets/{tweet}/like', [
    Api\LikeController::class,
    'store',
  ])->name('tweets.likes.store');
  Route::delete('tweets/{tweet}/like', [
    Api\LikeController::class,
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

  Route::get('feed', Api\FeedController::class)->name('api.feed');

  Route::group(['prefix' => 'api'], function () {
    Route::get(
      'users/{user:username}/feed',
      Api\UserTweetController::class
    )->name('api.users.tweets.index');
    Route::get('users/{user:username}/likes', [
      Api\LikeController::class,
      'index',
    ])->name('api.users.likes.index');
  });
});

Route::get('tweets/{tweet}', [TweetController::class, 'show'])->name(
  'tweets.show'
);

Route::get('{user:username}', [UserController::class, 'show'])->name(
  'users.show'
);

Route::get('{user:username}/likes', [UserLikeController::class, 'index'])->name(
  'users.likes.index'
);
