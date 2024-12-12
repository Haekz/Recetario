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
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard], // Ruta protegida
  },
  {
    path: 'receta-add',
    loadChildren: () => import('./recetas/receta-add/receta-add.module').then( m => m.RecetaAddPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'receta-all',
    loadChildren: () => import('./recetas/receta-all/receta-all.module').then( m => m.RecetaAllPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'receta-detail/:id',
    loadChildren: () => import('./recetas/receta-detail/receta-detail.module').then( m => m.RecetaDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'receta-edit/:id',
    loadChildren: () => import('./recetas/receta-edit/receta-edit.module').then( m => m.RecetaEditPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'receta-list',
    loadChildren: () => import('./recetas/receta-list/receta-list.module').then( m => m.RecetaListPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'principal',
    loadChildren: () => import('./public/principal/principal.module').then( m => m.PrincipalPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ensaladas',
    loadChildren: () => import('./public/ensaladas/ensaladas.module').then( m => m.EnsaladasPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'desayuno',
    loadChildren: () => import('./public/desayuno/desayuno.module').then( m => m.DesayunoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'plato-principal',
    loadChildren: () => import('./public/plato-principal/plato-principal.module').then( m => m.PlatoPrincipalPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'publicacion-detalle/:id',
    loadChildren: () => import('./public/publicacion-detalle/publicacion-detalle.module').then( m => m.PublicacionDetallePageModule),
    canActivate: [AuthGuard],
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}