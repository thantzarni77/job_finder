<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class EmployerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public $collects = EmployerResource::class;

    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }

    public function with($request)
    {
        return [
            'statusCode' => 200,
            'message'    => 'passes',
        ];
    }
}
