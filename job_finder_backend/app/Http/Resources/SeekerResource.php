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
            "skills"            => json_decode($this->skills),
            "education"         => json_decode($this->education),
            "work_experience"   => json_decode($this->work_experience),
            "role"              => $this->role,
            "talent"            => $this->talent,
            "social_media_link" => json_decode($this->social_media_link),
            "image"             => $this->image,
            "bio"               => $this->bio,
            "user_id"           => User::where('id', $this->user_id)->select('id', 'name', 'phone', 'address')->first(),
        ];
    }

}
