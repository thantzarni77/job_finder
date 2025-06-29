<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "company_name" => $this->company_name ,
            "company_address" => $this->company_address ,
            "company_phone" => $this->company_phone ,
            "company_email" => $this->company_email ,
            "company_image" => $this->company_image ,
            "company_description" => $this->company_description ,
            "company_type" => $this->company_type ,
            "verification" => $this->verification ,
            "user_id" => User::where('id', $this->user_id)->select('id','name')->first()
        ];
    }
}
