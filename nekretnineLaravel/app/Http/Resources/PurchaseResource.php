<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user,  
            'property' => new PropertyResource($this->property),  
            'transaction_amount' => $this->transaction_amount,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
