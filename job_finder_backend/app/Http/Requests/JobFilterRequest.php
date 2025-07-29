<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'sometimes|array',
            'role'=>'sometimes|array',
            'salary' => 'sometimes|array|size:2',
            'category' => 'sometimes|array',
        ];
    }
}
