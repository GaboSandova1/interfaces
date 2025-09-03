<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TypographyTheme;
use Illuminate\Http\Request;

class TypographyThemeController extends Controller
{
    public function index()
    {
        $themes = TypographyTheme::orderBy('is_default', 'desc')
                                ->orderBy('created_at', 'desc')
                                ->get();

        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'heading_font_family' => 'required|string|max:255',
            'heading_font_size' => 'required|string|max:10',
            'body_font_family' => 'required|string|max:255',
            'body_font_size' => 'required|string|max:10',
            'is_default' => 'boolean'
        ]);

        $theme = TypographyTheme::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $theme,
            'message' => 'Tema de tipografía creado exitosamente'
        ], 201);
    }

    public function show(TypographyTheme $typographyTheme)
    {
        return response()->json([
            'success' => true,
            'data' => $typographyTheme
        ]);
    }

    public function update(Request $request, TypographyTheme $typographyTheme)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'heading_font_family' => 'required|string|max:255',
            'heading_font_size' => 'required|string|max:10',
            'body_font_family' => 'required|string|max:255',
            'body_font_size' => 'required|string|max:10',
            'is_default' => 'boolean'
        ]);

        $typographyTheme->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $typographyTheme,
            'message' => 'Tema de tipografía actualizado exitosamente'
        ]);
    }

    public function destroy(TypographyTheme $typographyTheme)
    {
        if ($typographyTheme->is_default) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar el tema por defecto'
            ], 400);
        }

        $typographyTheme->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tema de tipografía eliminado exitosamente'
        ]);
    }

    public function getDefault()
    {
        $defaultTheme = TypographyTheme::where('is_default', true)->first();

        return response()->json([
            'success' => true,
            'data' => $defaultTheme
        ]);
    }
}