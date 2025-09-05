<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarouselImage extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'url', 'alt'];
}

class CarouselVideo extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'url', 'type'];
}
