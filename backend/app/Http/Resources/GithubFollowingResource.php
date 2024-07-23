<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GithubFollowingResource extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        $user = (object) $this->collection->all();

        return [
            'id' => $user->id,
            'username' => $user->login,
            'avatar' => $user->avatar_url,
            'github_link' => $user->html_url,
            'type' => $user->type,
            'site_admin' => $user->site_admin,
        ];
    }
}
