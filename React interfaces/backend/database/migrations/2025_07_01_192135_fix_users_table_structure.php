<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Primero, verificar si la columna 'role' existe, si no, agregarla
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('role', ['admin', 'user'])->default('user')->after('email');
            });
        }

        // Verificar y agregar columnas faltantes una por una
        $columnsToAdd = [
            'first_name' => ['type' => 'string', 'nullable' => true, 'after' => 'name'],
            'last_name' => ['type' => 'string', 'nullable' => true, 'after' => 'first_name'],
            'maiden_name' => ['type' => 'string', 'nullable' => true, 'after' => 'last_name'],
            'age' => ['type' => 'integer', 'nullable' => true, 'after' => 'maiden_name'],
            'gender' => ['type' => 'enum', 'values' => ['male', 'female', 'other'], 'nullable' => true, 'after' => 'age'],
            'phone' => ['type' => 'string', 'nullable' => true, 'after' => 'gender'],
            'username' => ['type' => 'string', 'nullable' => true, 'after' => 'phone'],
            'birth_date' => ['type' => 'date', 'nullable' => true, 'after' => 'username'],
            'image' => ['type' => 'string', 'nullable' => true, 'after' => 'birth_date'],
            'blood_group' => ['type' => 'string', 'nullable' => true, 'after' => 'image'],
            'height' => ['type' => 'decimal', 'precision' => 5, 'scale' => 2, 'nullable' => true, 'after' => 'blood_group'],
            'weight' => ['type' => 'decimal', 'precision' => 5, 'scale' => 2, 'nullable' => true, 'after' => 'height'],
            'eye_color' => ['type' => 'string', 'nullable' => true, 'after' => 'weight'],
            'hair' => ['type' => 'json', 'nullable' => true, 'after' => 'eye_color'],
            'ip' => ['type' => 'string', 'nullable' => true, 'after' => 'hair'],
            'address' => ['type' => 'json', 'nullable' => true, 'after' => 'ip'],
            'mac_address' => ['type' => 'string', 'nullable' => true, 'after' => 'address'],
            'university' => ['type' => 'string', 'nullable' => true, 'after' => 'mac_address'],
            'bank' => ['type' => 'json', 'nullable' => true, 'after' => 'university'],
            'company' => ['type' => 'json', 'nullable' => true, 'after' => 'bank'],
            'ein' => ['type' => 'string', 'nullable' => true, 'after' => 'company'],
            'ssn' => ['type' => 'string', 'nullable' => true, 'after' => 'ein'],
            'user_agent' => ['type' => 'text', 'nullable' => true, 'after' => 'ssn'],
            'crypto' => ['type' => 'json', 'nullable' => true, 'after' => 'user_agent'],
        ];

        foreach ($columnsToAdd as $columnName => $config) {
            if (!Schema::hasColumn('users', $columnName)) {
                Schema::table('users', function (Blueprint $table) use ($columnName, $config) {
                    switch ($config['type']) {
                        case 'string':
                            $column = $table->string($columnName);
                            break;
                        case 'integer':
                            $column = $table->integer($columnName);
                            break;
                        case 'enum':
                            $column = $table->enum($columnName, $config['values']);
                            break;
                        case 'date':
                            $column = $table->date($columnName);
                            break;
                        case 'decimal':
                            $column = $table->decimal($columnName, $config['precision'], $config['scale']);
                            break;
                        case 'json':
                            $column = $table->json($columnName);
                            break;
                        case 'text':
                            $column = $table->text($columnName);
                            break;
                        default:
                            $column = $table->string($columnName);
                    }
                    
                    if ($config['nullable']) {
                        $column->nullable();
                    }
                    
                    if (isset($config['after'])) {
                        $column->after($config['after']);
                    }
                });
            }
        }
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
