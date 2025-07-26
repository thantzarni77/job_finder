<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {

            $token = $request->bearerToken();

            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 401);
            }

            $admin = auth('admin')->setToken($token)->authenticate();

            if (!$admin) {
                return response()->json(['message' => 'Admin not found'], 401);
            }

        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['message' => 'Token is invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token error: ' . $e->getMessage()], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong', 'error' => $e->getMessage()], 500);
        }

        return $next($request);
    }
}
