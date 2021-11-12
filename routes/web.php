<?php

use App\Http\Controllers\TweetController;
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
});
