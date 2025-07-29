<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Seeker;
use App\Models\ApplyJob;
use App\Models\Employer;
use App\Models\Apply_job;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',        
        'address',
        'password',
        'user_type',
        'profile_picture',
        'refresh_token',
        'provider',
        'provider_id',
        'provider_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    public static function getUserType()
    {
        return [
            'admin' => 'admin',
            'seeker' => 'seeker',
            'employer'  => 'employer',
            'super admin' => 'super admin'
        ];
    }

    public function seeker()
    {
        return $this->hasOne(Seeker::class , 'user_id');
    }

    public function employer()
    {
        return $this->hasOne(Employer::class , 'user_id');
    }

    public function applyJob()
    {
        return $this->hasMany(ApplyJob::class);
    }
   
}
