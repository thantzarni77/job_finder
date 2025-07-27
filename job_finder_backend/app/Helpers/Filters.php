<?php


namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;


class Filters
{
    protected Builder $builder;
    protected  array $filter_data;


    public function __construct($filter_data)
    {

        $this->filter_data = $filter_data;
    }

    public function filter(Builder $builder): Builder
    {

        $this->builder = $builder;
        foreach ($this->filter_data as $key => $value) {
            if (method_exists($this, $key)) {
                $this->$key($value);
            }
        }

        return $this->builder;
    }

    public function type(array $type): Builder
    {

        return $this->builder->whereIn('type', $type);
    }


    public function role(array $role): Builder
    {

        return $this->builder->whereIn('role', $role);
    }


    public function salary(array $salary)
    {

        $min = $salary['min'];
        $max = $salary['max'];


        if (!$min) {
            $this->builder->whereRaw('CAST(salary AS UNSIGNED) <= ?', [$max]);
        }

        if (!$max) {
            $this->builder->whereRaw('CAST(salary AS UNSIGNED) >= ?', [$min]);
        }

        return $this->builder;
    }

    public function category(array $category): Builder
    {
        return $this->builder->whereHas('category', function ($q) use ($category) {
            $q->whereIn('name', $category);
        });
    }

    public function talent(array $talent): Builder
    {
        return $this->builder->whereIn('talent', $talent);
    }
}
