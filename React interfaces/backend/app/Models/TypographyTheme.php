<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypographyTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'heading_font_family',
        'heading_font_size',
        'body_font_family',
        'body_font_size',
        'is_default'
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    // Asegurar que solo haya un tema por defecto
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if ($model->is_default) {
                static::where('is_default', true)->update(['is_default' => false]);
            }
        });
    }
}