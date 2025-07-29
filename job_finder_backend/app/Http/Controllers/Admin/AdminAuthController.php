<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminAuthController extends Controller
{
    public function index()
    {
        $admin = User::where('user_type', 'admin')->get();
        if(empty($admin) || !$admin) {
            return response()->json(['status' => 'error', 'message' => 'Admin not found.'], 404);
        }

        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch admin data.', 'data' => $admin], 200);
    }

    public function store(Request $request)
    {
        $this->validateData($request);
        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $admin["user_type"] = "admin";
        return response()->json(['status' => 'success', 'message' => 'You have successfully create admin.', 'data' => $admin], 200);
    }

    public function show($id)
    {
        $admin = User::where('user_type', 'admin')->find($id);
        return response()->json(['status' => 'success', 'message' => 'You have successfully fetch admin data.', 'data' => $admin], 200);
    }

    public function update(Request $request, $id)
    {   
        // dd($request->all());
        $this->validateData($request);
        $admin = User::find($id);
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->save();
        return response()->json(['status' => 'success', 'message' => 'You have successfully update admin.', 'data' => $admin], 200);
    }

    public function destroy($id)
    {
        $admin = User::find($id);
        $admin->delete();
        return response()->json(['status' => 'success', 'message' => 'You have successfully delete admin.'], 200);
    }

    private function validateData($request)
    {
        $request->validate([
            'name' => ['sometimes', 'string', 'max:255', Rule::unique('users')->ignore($request->id)],
            'email' => 'sometimes',
            'password' => 'sometimes',
        ]);
    }
}
