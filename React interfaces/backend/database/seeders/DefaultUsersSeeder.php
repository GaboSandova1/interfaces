<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DefaultUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario administrador
        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administrador',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin'
            ]
        );

        // Usuario demo
        User::firstOrCreate(
            ['email' => 'demo@demo.com'],
            [
                'name' => 'Usuario Demo',
                'email' => 'demo@demo.com',
                'password' => Hash::make('demo123'),
                'role' => 'user'
            ]
        );
    }
}