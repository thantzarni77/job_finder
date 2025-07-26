<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeekerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"                => $this->id,
            "skills"            => $this->skills,
            "education"         => $this->education,
            "work_experience"   => $this->work_experience,
            "role"              => $this->role,
            "talent"            => $this->talent,
            "social_media_link" => $this->social_media_link,
            "image"             => $this->image,
            "bio"               => $this->bio,
            "user_id"           => User::where('id', $this->user_id)->select('id', 'email', 'name', 'phone', 'address')->first(),
            "created_at"  => $this->created_at,
        ];
    }
}
