<?php

namespace App\Http\Controllers;

use App\Http\Resources\GithubFollowingResource;
use App\Http\Resources\GithubResource;
use App\Services\GithubService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class GithubController extends Controller
{
    public function user(string $githubUser): JsonResource|JsonResponse
    {
        try {
            return new GithubResource((new GithubService)->getUser($githubUser));
        } catch (\Throwable $th) {
            return response()->json(['message' => 'User not found', 'status' => '404'], 404);
        }
    }

    public function userFollowing(Request $request, string $githubUser) : AnonymousResourceCollection|JsonResponse
    {
        try {
            $search = $request->get('search', '');
            $perPage = (int) $request->get('per_page', 100);

            $userFollowing = (new GithubService)->getUserFollowing(
                strtolower($githubUser),
                $perPage
            );

            if ($search) {
                $userFollowing = collect($userFollowing)->filter(function (array $user) use ($search) {
                    return stripos($user['login'], $search) !== false;
                });
            }

            return GithubFollowingResource::collection($userFollowing);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'The user does not follow anyone', 'status' => '200'], 200);
        }
    }
}
