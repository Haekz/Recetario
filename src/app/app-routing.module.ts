import { NgModule } from '@angular/core'; // Importa NgModule
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; // Importa PreloadAllModules y Routes
import { LoginComponent } from './pages/login/login.component'; // Importa LoginComponent
import { SearchResultsComponent } from './pages/search-results/search-results.component'; // Importa SearchResultsComponent
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'; // Importa ResetPasswordComponent
import { RegisterComponent } from './pages/register/register.component'; // Importa RegisterComponent

const routes: Routes = [ // Define las rutas de la aplicación
  {
    path: 'login', // Agrega la ruta de inicio de sesión
    component: LoginComponent
  },
  {
    path: 'search-results', // Agrega la ruta de resultados de búsqueda
    component: SearchResultsComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) // Carga el módulo de la página de inicio
  },
  {
    path: 'reset-password', // Agrega la ruta de restablecimiento de contraseña
    component: ResetPasswordComponent
  },
  {
    path: '',
    redirectTo: 'login', // Redirige a la página de inicio de sesión
    pathMatch: 'full'
  },
  {
    path: 'register', // Agrega la ruta de registro
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'login'  // Maneja rutas no encontradas
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
