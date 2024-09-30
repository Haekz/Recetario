import { NgModule } from '@angular/core'; // Importa NgModule
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; // Importa PreloadAllModules y Routes
import { noIngresadoGuard } from './no-ingresado.guard';
import { ingresadoGuard } from './ingresado.guard';

const routes: Routes = [ // Define las rutas de la aplicación

  {
    path: '',
    redirectTo: 'inicio', // Redirige a la página de inicio de sesión
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [noIngresadoGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [noIngresadoGuard]
  },
  {
    path: 'restar-contra',
    loadChildren: () => import('./restar-contra/restar-contra.module').then( m => m.RestarContraPageModule),
    canActivate: [noIngresadoGuard]
  },
  {
    path: 'buscar-result',
    loadChildren: () => import('./buscar-result/buscar-result.module').then( m => m.BuscarResultPageModule),
    canActivate: [ingresadoGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), // Carga el módulo de la página de inicio
    canActivate: [ingresadoGuard]
  },
  {
    path: '**',
    redirectTo: 'buscar-result'  // Maneja rutas no encontradas
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
