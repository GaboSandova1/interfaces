<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Campos básicos adicionales
            $table->string('first_name')->nullable()->after('name');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('maiden_name')->nullable()->after('last_name');
            $table->integer('age')->nullable()->after('maiden_name');
            $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('age');
            $table->string('phone')->nullable()->after('gender');
            $table->string('username')->nullable()->after('phone');
            $table->date('birth_date')->nullable()->after('username');
            $table->string('image')->nullable()->after('birth_date');
            $table->string('blood_group')->nullable()->after('image');
            
            // Datos físicos
            $table->decimal('height', 5, 2)->nullable()->after('blood_group');
            $table->decimal('weight', 5, 2)->nullable()->after('height');
            $table->string('eye_color')->nullable()->after('weight');
            
            // Cabello (JSON)
            $table->json('hair')->nullable()->after('eye_color');
            
            $table->string('ip')->nullable()->after('hair');
            
            // Dirección (JSON)
            $table->json('address')->nullable()->after('ip');
            
            $table->string('mac_address')->nullable()->after('address');
            $table->string('university')->nullable()->after('mac_address');
            
            // Datos bancarios (JSON)
            $table->json('bank')->nullable()->after('university');
            
            // Datos de compañía (JSON)
            $table->json('company')->nullable()->after('bank');
            
            // Datos finales
            $table->string('ein')->nullable()->after('company');
            $table->string('ssn')->nullable()->after('ein');
            $table->text('user_agent')->nullable()->after('ssn');
            
            // Cripto (JSON)
            $table->json('crypto')->nullable()->after('user_agent');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'first_name', 'last_name', 'maiden_name', 'age', 'gender',
                'phone', 'username', 'birth_date', 'image', 'blood_group',
                'height', 'weight', 'eye_color', 'hair', 'ip', 'address',
                'mac_address', 'university', 'bank', 'company', 'ein',
                'ssn', 'user_agent', 'crypto'
            ]);
        });
    }
};
