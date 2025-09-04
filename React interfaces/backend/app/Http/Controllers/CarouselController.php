<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CarouselController extends Controller
{
    // Listar imágenes o videos
    public function index(Request $request)
    {
        $type = $request->query('type'); // 'image' o 'video'
        $files = Storage::disk('public')->files('carousel/' . $type);
        $files = array_map(function ($file) {
            return [
                'name' => basename($file),
                'url' => Storage::url($file),
            ];
        }, $files);
        return response()->json($files);
    }

    // Subir imagen o video
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,mp4,mov,avi|max:20480', // 20MB máx
            'type' => 'required|in:image,video',
        ]);
        $file = $request->file('file');
        $type = $request->input('type');
        $filename = Str::random(16) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('carousel/' . $type, $filename, 'public');
        return response()->json([
            'name' => $filename,
            'url' => Storage::url($path),
        ]);
    }

    // Eliminar imagen o video
    public function destroy(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'name' => 'required|string',
        ]);
        $path = 'carousel/' . $request->input('type') . '/' . $request->input('name');
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false, 'message' => 'Archivo no encontrado'], 404);
    }
}
