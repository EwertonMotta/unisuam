<?php

namespace App\Services;

use App\Jobs\LogRequest;
use App\Jobs\LogResponse;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GithubService
{
    public function getUser($githubUser)
    {
        $userAPI = 'https://api.github.com/users/'.$githubUser;

        LogRequest::dispatch('GET', $userAPI);
        $response = Cache::remember($githubUser, 1800, function () use ($userAPI) {
            $request = Http::get($userAPI);

            if ($request->notFound()) {
                throw new Exception($request->body());
            }

            return $request->json();
        });

        LogResponse::dispatch($response);

        return $response;
    }

    public function getUserFollowing($githubUser, $perPage = 100)
    {
        $userFollowingAPI = "https://api.github.com/users/$githubUser/following?per_page=$perPage";

        LogRequest::dispatch('GET', $userFollowingAPI);

        $response = Cache::remember("$githubUser::following", 1800, function () use ($userFollowingAPI) {
            $request = Http::get($userFollowingAPI);

            if ($request->body() === '[]') {
                throw new Exception('The user does not follow anyone');
            }

            return $request->json();
        });

        LogResponse::dispatch($response);

        return $response;
    }
}
