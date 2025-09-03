<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'first_name',
        'last_name',
        'maiden_name',
        'age',
        'gender',
        'phone',
        'username',
        'birth_date',
        'image',
        'blood_group',
        'height',
        'weight',
        'eye_color',
        'hair',
        'ip',
        'address',
        'mac_address',
        'university',
        'bank',
        'company',
        'ein',
        'ssn',
        'user_agent',
        'crypto',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
            'hair' => 'array',
            'address' => 'array',
            'bank' => 'array',
            'company' => 'array',
            'crypto' => 'array',
        ];
    }

    // Accessor para obtener el nombre completo
    public function getFullNameAttribute()
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }
}
