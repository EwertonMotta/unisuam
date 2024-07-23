<?php

use App\Http\Controllers\GithubController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'user'], function () {
    Route::get('/{githubUser}', [GithubController::class, 'user']);
    Route::get('/{githubUser}/following', [GithubController::class, 'userFollowing']);
});
