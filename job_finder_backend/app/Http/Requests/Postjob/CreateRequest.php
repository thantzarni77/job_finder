<?php

namespace App\Http\Requests\Postjob;

use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
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
            'job_title' => 'required|string|max:255',
            'salary' => 'nullable|string',
            'role' => 'required',
            'location' => 'required|string',
            'type' => 'required',
            'requirements' => 'nullable|string',
            'description' => 'required|string',
            'deadline' => 'required|date',
            'vacancy' => 'required|integer',
            'note'=> 'nullable|string',
            'benefits' => 'nullable|string',
            'gender' => 'required',
        ];
    }
}
