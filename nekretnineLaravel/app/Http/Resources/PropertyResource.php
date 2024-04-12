<?php

namespace App\Http\Resources;

use App\Models\PropertyImage;
use App\Models\PropertyType;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
       // Izvršite upit za sve slike koje imaju isti property ID
       $images = PropertyImage::where('property_id', $this->id)->get();

       // Kreirajte niz slika za dodavanje u resurs
       $imageUrls = [];
       foreach ($images as $image) {
           $imageUrls[] = $image->url;
       }

       return [
           'id' => $this->id,
           'title' => $this->title,
           'description' => $this->description,
           'price' => $this->price,
           'bedrooms' => $this->bedrooms,
           'propery_type' => PropertyType::find($this->property_type_id),
           'images' => $imageUrls, // Dodajte niz URL-ova slika umesto polja 'images'
       ];
    }
}
