<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'property_type_id',  
        'bedrooms',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function propertyType()
    {
        return $this->belongsTo(PropertyType::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
