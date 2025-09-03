<?php

namespace App\Http\Controllers;

use App\Models\Font;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FontController extends Controller
{
public function index()
{
    try {
        // Usar el modelo Font que ya tienes
        $fonts = Font::where('is_active', true)->get();
        
        return response()->json([
            'success' => true,
            'data' => $fonts,
            'message' => 'Fonts retrieved successfully'
        ]);
    } catch (\Exception $e) {
        \Log::error('Error retrieving fonts: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Error retrieving fonts: ' . $e->getMessage()
        ], 500);
    }
}

    public function store(Request $request)
    {
        $request->validate([
            'font_file' => 'required|file|mimes:ttf|max:2048',
            'display_name' => 'required|string|max:255'
        ]);

        $file = $request->file('font_file');
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $fileName = Str::slug($originalName) . '_' . time() . '.ttf';
        
        // Guardar el archivo
        $path = $file->storeAs('fonts', $fileName, 'public');
        
        // Crear el registro en la base de datos
        $font = Font::create([
            'name' => Str::slug($originalName),
            'display_name' => $request->display_name,
            'file_path' => $path,
            'font_family' => $originalName,
            'is_active' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Fuente subida correctamente',
            'data' => $font
        ]);
    }

    public function destroy($id)
    {
        $font = Font::findOrFail($id);
        
        // Eliminar el archivo
        if (Storage::disk('public')->exists($font->file_path)) {
            Storage::disk('public')->delete($font->file_path);
        }
        
        $font->delete();

        return response()->json([
            'success' => true,
            'message' => 'Fuente eliminada correctamente'
        ]);
    }

    public function toggleActive($id)
    {
        $font = Font::findOrFail($id);
        $font->is_active = !$font->is_active;
        $font->save();

        return response()->json([
            'success' => true,
            'message' => 'Estado de la fuente actualizado correctamente',
            'data' => $font
        ]);
    }

} 