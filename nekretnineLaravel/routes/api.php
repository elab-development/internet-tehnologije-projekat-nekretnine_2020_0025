<?php

use App\Http\Controllers\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 

Route::get('/properties',[PropertyController::class,'index']);
Route::get('/properties/{id}',[PropertyController::class,'show']);

Route::delete('/properties/{id}',[PropertyController::class,'destroy']);
Route::post('/properties',[PropertyController::class,'store']);
Route::put('/properties/{id}',[PropertyController::class,'update']);