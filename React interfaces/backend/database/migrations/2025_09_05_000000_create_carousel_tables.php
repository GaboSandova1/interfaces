<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('carousel_images', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url');
            $table->string('alt')->nullable();
            $table->timestamps();
        });

        Schema::create('carousel_videos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url');
            $table->string('type')->default('video/mp4');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('carousel_images');
        Schema::dropIfExists('carousel_videos');
    }
};
