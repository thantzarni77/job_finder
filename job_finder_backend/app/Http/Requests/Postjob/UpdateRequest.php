<?php

namespace App\Http\Requests\Postjob;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'employer_id' => 'required|integer',
            'category_id' => 'required|integer',
            'job_title' => 'sometimes|string|max:255',
            'salary' => 'nullable|string',
            'role' => 'sometimes',
            'location' => 'sometimes|string',
            'type' => 'sometimes',
            'requirements' => 'nullable|string',
            'description' => 'sometimes|string',
            'deadline' => 'sometimes|date',
            'vacancy' => 'sometimes|integer',
            'note'=> 'nullable|string',
            'benefits' => 'nullable|string',
            'gender' => 'sometimes',
        ];
    }
}
