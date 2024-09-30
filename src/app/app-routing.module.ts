import { NgModule } from '@angular/core'; // Importa NgModule
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; // Importa PreloadAllModules y Routes

const routes: Routes = [ // Define las rutas de la aplicación

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) // Carga el módulo de la página de inicio
  },
  {
    path: '',
    redirectTo: 'inicio', // Redirige a la página de inicio de sesión
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'buscar-result'  // Maneja rutas no encontradas
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'restar-contra',
    loadChildren: () => import('./restar-contra/restar-contra.module').then( m => m.RestarContraPageModule)
  },
  {
    path: 'buscar-result',
    loadChildren: () => import('./buscar-result/buscar-result.module').then( m => m.BuscarResultPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
