import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio', // Redirige a la página de inicio de sesión
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule),
  },
  {
    path: 'restar-contra',
    loadChildren: () => import('./restar-contra/restar-contra.module').then(m => m.RestarContraPageModule),
  },
  {
    path: 'buscar-result',
    loadChildren: () => import('./buscar-result/buscar-result.module').then(m => m.BuscarResultPageModule),
    canActivate: [AuthGuard], // Ruta protegida
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard], // Ruta protegida
  },
  {
    path: '**',
    redirectTo: 'inicio', // Maneja rutas no encontradas
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}