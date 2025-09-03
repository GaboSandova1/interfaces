<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorTheme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'text_color',
        'title_color',
        'background_color',
        'highlight_color',
        'button_color',
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