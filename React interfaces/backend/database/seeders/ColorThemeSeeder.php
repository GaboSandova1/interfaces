<?php

namespace Database\Seeders;

use App\Models\ColorTheme;
use Illuminate\Database\Seeder;

class ColorThemeSeeder extends Seeder
{
    public function run(): void
    {
        ColorTheme::create([
            'name' => 'Tema Clásico (Por Defecto)',
            'text_color' => '#333333',
            'title_color' => '#000000',
            'background_color' => '#ffffff',
            'highlight_color' => '#007bff',
            'button_color' => '#0056b3',
            'is_default' => true
        ]);

        ColorTheme::create([
            'name' => 'Tema Oscuro',
            'text_color' => '#e0e0e0',
            'title_color' => '#ffffff',
            'background_color' => '#1a1a1a',
            'highlight_color' => '#4dabf7',
            'button_color' => '#339af0',
            'is_default' => false
        ]);

        ColorTheme::create([
            'name' => 'Tema Verde',
            'text_color' => '#2d3748',
            'title_color' => '#1a202c',
            'background_color' => '#f7fafc',
            'highlight_color' => '#38a169',
            'button_color' => '#2f855a',
            'is_default' => false
        ]);
    }
}