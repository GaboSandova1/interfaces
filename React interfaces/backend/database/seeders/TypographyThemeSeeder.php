<?php

namespace Database\Seeders;

use App\Models\TypographyTheme;
use Illuminate\Database\Seeder;

class TypographyThemeSeeder extends Seeder
{
    public function run(): void
    {
        TypographyTheme::create([
            'name' => 'Tipografía Clásica (Por Defecto)',
            'heading_font_family' => 'Georgia, serif',
            'heading_font_size' => '24px',
            'body_font_family' => 'Roboto, sans-serif',
            'body_font_size' => '16px',
            'is_default' => true
        ]);

        TypographyTheme::create([
            'name' => 'Tipografía Moderna',
            'heading_font_family' => 'Montserrat, sans-serif',
            'heading_font_size' => '26px',
            'body_font_family' => '"Open Sans", sans-serif',
            'body_font_size' => '15px',
            'is_default' => false
        ]);

        TypographyTheme::create([
            'name' => 'Tipografía Elegante',
            'heading_font_family' => '"Playfair Display", serif',
            'heading_font_size' => '28px',
            'body_font_family' => 'Lato, sans-serif',
            'body_font_size' => '16px',
            'is_default' => false
        ]);
    }
}