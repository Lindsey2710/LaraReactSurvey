<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * De root namespace voor controllers.
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Definieert de "home" route voor de applicatie.
     * Wordt gebruikt door Laravel authenticatie.
     */
    public const HOME = '/home';

    /**
     * De route bindings, patroonfilters, enz.
     */
    public function boot()
    {
      parent::boot();

      $this->routes(function () {
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    });
    }

    /**
     * Definieert de routes voor de applicatie.
     */
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    /**
     * Definieert de "web" routes voor de applicatie.
     * Deze routes krijgen de "web" middleware.
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    /**
     * Definieert de "api" routes voor de applicatie.
     * Deze routes krijgen de "api" middleware.
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
}
