<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('typography_themes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('heading_font_family');
            $table->string('heading_font_size');
            $table->string('body_font_family');
            $table->string('body_font_size');
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('typography_themes');
    }
};