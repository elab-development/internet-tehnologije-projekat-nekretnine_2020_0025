<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistikaController extends Controller
{
    public function statistics()
    {
        $topProperties = Property::select('properties.id', 'properties.title', DB::raw('COUNT(purchases.id) as reservations_count'))
            ->leftJoin('purchases', 'properties.id', '=', 'purchases.property_id')
            ->groupBy('properties.id', 'properties.title')
            ->orderByDesc('reservations_count')
            ->take(5)
            ->get();

        return response()->json($topProperties);
    }


    
}
