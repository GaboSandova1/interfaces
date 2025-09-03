<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Verificar si las columnas ya existen antes de agregarlas
            if (!Schema::hasColumn('users', 'first_name')) {
                $table->string('first_name')->nullable()->after('name');
            }
            if (!Schema::hasColumn('users', 'last_name')) {
                $table->string('last_name')->nullable()->after('first_name');
            }
            if (!Schema::hasColumn('users', 'maiden_name')) {
                $table->string('maiden_name')->nullable()->after('last_name');
            }
            // Nota: age se removió del formulario, pero mantenemos la columna por compatibilidad
            if (!Schema::hasColumn('users', 'age')) {
                $table->integer('age')->nullable()->after('maiden_name');
            }
            if (!Schema::hasColumn('users', 'gender')) {
                $table->enum('gender', ['male', 'female', 'other'])->nullable()->after('age');
            }
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->nullable()->after('gender');
            }
            if (!Schema::hasColumn('users', 'username')) {
                $table->string('username')->nullable()->after('phone');
            }
            if (!Schema::hasColumn('users', 'birth_date')) {
                $table->date('birth_date')->nullable()->after('username');
            }
            if (!Schema::hasColumn('users', 'image')) {
                $table->string('image')->nullable()->after('birth_date');
            }
            if (!Schema::hasColumn('users', 'blood_group')) {
                $table->string('blood_group')->nullable()->after('image');
            }
            
            // Datos físicos
            if (!Schema::hasColumn('users', 'height')) {
                $table->decimal('height', 5, 2)->nullable()->after('blood_group');
            }
            if (!Schema::hasColumn('users', 'weight')) {
                $table->decimal('weight', 5, 2)->nullable()->after('height');
            }
            if (!Schema::hasColumn('users', 'eye_color')) {
                $table->string('eye_color')->nullable()->after('weight');
            }
            
            // Cabello (JSON)
            if (!Schema::hasColumn('users', 'hair')) {
                $table->json('hair')->nullable()->after('eye_color');
            }
            
            if (!Schema::hasColumn('users', 'ip')) {
                $table->string('ip')->nullable()->after('hair');
            }
            
            // Dirección (JSON) - ahora principalmente coordenadas y código postal
            if (!Schema::hasColumn('users', 'address')) {
                $table->json('address')->nullable()->after('ip');
            }
            
            if (!Schema::hasColumn('users', 'mac_address')) {
                $table->string('mac_address')->nullable()->after('address');
            }
            if (!Schema::hasColumn('users', 'university')) {
                $table->string('university')->nullable()->after('mac_address');
            }
            
            // Datos bancarios (JSON)
            if (!Schema::hasColumn('users', 'bank')) {
                $table->json('bank')->nullable()->after('university');
            }
            
            // Datos de compañía (JSON) - incluye dirección con coordenadas
            if (!Schema::hasColumn('users', 'company')) {
                $table->json('company')->nullable()->after('bank');
            }
            
            // Datos finales
            if (!Schema::hasColumn('users', 'ein')) {
                $table->string('ein')->nullable()->after('company');
            }
            if (!Schema::hasColumn('users', 'ssn')) {
                $table->string('ssn')->nullable()->after('ein');
            }
            if (!Schema::hasColumn('users', 'user_agent')) {
                $table->text('user_agent')->nullable()->after('ssn');
            }
            
            // Cripto (JSON)
            if (!Schema::hasColumn('users', 'crypto')) {
                $table->json('crypto')->nullable()->after('user_agent');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $columns = [
                'first_name', 'last_name', 'maiden_name', 'age', 'gender',
                'phone', 'username', 'birth_date', 'image', 'blood_group',
                'height', 'weight', 'eye_color', 'hair', 'ip', 'address',
                'mac_address', 'university', 'bank', 'company', 'ein',
                'ssn', 'user_agent', 'crypto'
            ];
            
            foreach ($columns as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
