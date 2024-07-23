<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GithubResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = (object) $this->resource;

        return [
            'avatar' => $user->avatar_url,
            'name' => $user->name,
            'username' => $user->login,
            'bio' => $user->bio,
            'github_link' => $user->html_url,
            'blog_link' => $user->blog,
            'company' => $user->company,
            'location' => $user->location,
            'public_repositories' => $user->public_repos,
            'followers' => $user->followers,
            'following' => $user->following,
        ];
    }
}
