<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ColorTheme;
use Illuminate\Http\Request;

class ColorThemeController extends Controller
{
    public function index()
    {
        $themes = ColorTheme::orderBy('is_default', 'desc')
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
            'text_color' => 'required|string|max:7',
            'title_color' => 'required|string|max:7',
            'background_color' => 'required|string|max:7',
            'highlight_color' => 'required|string|max:7',
            'button_color' => 'required|string|max:7',
            'is_default' => 'boolean'
        ]);

        $theme = ColorTheme::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $theme,
            'message' => 'Tema de colores creado exitosamente'
        ], 201);
    }

    public function show(ColorTheme $colorTheme)
    {
        return response()->json([
            'success' => true,
            'data' => $colorTheme
        ]);
    }

    public function update(Request $request, ColorTheme $colorTheme)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'text_color' => 'required|string|max:7',
            'title_color' => 'required|string|max:7',
            'background_color' => 'required|string|max:7',
            'highlight_color' => 'required|string|max:7',
            'button_color' => 'required|string|max:7',
            'is_default' => 'boolean'
        ]);

        $colorTheme->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $colorTheme,
            'message' => 'Tema de colores actualizado exitosamente'
        ]);
    }

    public function destroy(ColorTheme $colorTheme)
    {
        if ($colorTheme->is_default) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar el tema por defecto'
            ], 400);
        }

        $colorTheme->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tema de colores eliminado exitosamente'
        ]);
    }

    public function getDefault()
    {
        $defaultTheme = ColorTheme::where('is_default', true)->first();

        return response()->json([
            'success' => true,
            'data' => $defaultTheme
        ]);
    }
}