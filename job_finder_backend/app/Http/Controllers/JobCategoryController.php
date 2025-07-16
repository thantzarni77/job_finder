<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\CategoryRepositoryInterface;

class JobCategoryController extends Controller
{
    protected CategoryRepositoryInterface $repository;

    public function __construct(CategoryRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    //  READ ALL
    public function index()
    {
        return response()->json([
            'success' => true,
            // 'message' => 'Categories fetched successfully',
            'data' => $this->repository->all()
        ]);
    }

    //  CREATE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = $this->repository->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    //  READ ONE
    public function show($id)
    {
        $category = $this->repository->find($id);

        return response()->json([
            'success' => true,
            // 'message' => 'Category fetched successfully',
            'data' => $category
        ]);
    }

    //  UPDATE
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = $this->repository->update($id, $validated);

        return response()->json([  
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $deletedCategory = $this->repository->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
            'data' => $deletedCategory
        ]);
    }
}
