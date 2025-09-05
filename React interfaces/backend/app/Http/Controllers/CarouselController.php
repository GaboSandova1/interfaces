<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\CarouselImage;
use App\Models\CarouselVideo;

class CarouselController extends Controller
{
    // Listar imágenes o videos
    public function index(Request $request)
    {
        $type = $request->query('type'); // 'image' o 'video'
        if ($type === 'image') {
            $images = CarouselImage::all(['id', 'name', 'url', 'alt']);
            // Asegura que la URL sea pública y completa
            $images = $images->map(function($img) {
                $img->url = url($img->url);
                return $img;
            });
            return response()->json($images);
        } elseif ($type === 'video') {
            $videos = CarouselVideo::all(['id', 'name', 'url', 'type']);
            // Asegura que la URL sea pública y completa
            $videos = $videos->map(function($vid) {
                $vid->url = url($vid->url);
                return $vid;
            });
            return response()->json($videos);
        }
        return response()->json([]);
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
        $url = Storage::url($path);
        $fullUrl = url($url);

        if ($type === 'image') {
            $img = CarouselImage::create([
                'name' => $filename,
                'url' => $url,
                'alt' => $file->getClientOriginalName(),
            ]);
            // Retorna la URL pública completa
            $img->url = $fullUrl;
            return response()->json($img);
        } else {
            $vid = CarouselVideo::create([
                'name' => $filename,
                'url' => $url,
                'type' => $file->getClientMimeType(),
            ]);
            // Retorna la URL pública completa
            $vid->url = url($url);
            return response()->json($vid);
        }
    }

    // Eliminar imagen o video
    public function destroy(Request $request)
    {
        $request->validate([
            'type' => 'required|in:image,video',
            'name' => 'required|string',
        ]);
        $type = $request->input('type');
        $name = $request->input('name');
        $path = 'carousel/' . $type . '/' . $name;
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            if ($type === 'image') {
                CarouselImage::where('name', $name)->delete();
            } else {
                CarouselVideo::where('name', $name)->delete();
            }
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false, 'message' => 'Archivo no encontrado'], 404);
    }
}
