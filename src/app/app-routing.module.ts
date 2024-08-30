import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: '',
    redirectTo: 'login',  // Redirige a login por defecto
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'  // Maneja rutas no encontradas
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
