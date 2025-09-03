<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Font extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'file_path',
        'font_family',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
} 