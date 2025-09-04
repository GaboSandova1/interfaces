<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ColorThemeController;
use App\Http\Controllers\Api\TypographyThemeController;
use App\Http\Controllers\FontController; // Asegúrate de importar FontController
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CarouselController;

// Rutas públicas de autenticación
Route::prefix('v1/auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Rutas protegidas
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Rutas de autenticación protegidas
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/refresh', [AuthController::class, 'refreshToken']);
    
    // Rutas para temas de colores
    Route::apiResource('color-themes', ColorThemeController::class);
    Route::get('color-themes-default', [ColorThemeController::class, 'getDefault']);
    
    // Rutas para temas de tipografía
    Route::apiResource('typography-themes', TypographyThemeController::class);
    Route::get('typography-themes-default', [TypographyThemeController::class, 'getDefault']);
    
    // Cambiar esta línea para usar FontController
    Route::get('fonts', [FontController::class, 'index']); // Cambiar aquí
    
    // Opcional: Si quieres todas las operaciones CRUD para fonts
    Route::apiResource('fonts', FontController::class)->except(['show', 'update']);

    // Rutas para usuarios
    Route::apiResource('users', UserController::class);
    
    // Rutas para el carrusel de imágenes y videos
    Route::get('carousel', [CarouselController::class, 'index']);
    Route::post('carousel', [CarouselController::class, 'store']);
    Route::delete('carousel', [CarouselController::class, 'destroy']);
});