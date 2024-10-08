import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service'; // Ajusta el path según tu estructura

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario ha iniciado sesión utilizando el servicio
    if (this.usuarioService.isAuthenticated()) {
      return true; // Permite el acceso a la ruta
    } else {
      this.router.navigate(['/inicio']); // Redirige al usuario a la página de inicio de sesión
      return false; // Bloquea el acceso a la ruta
    }
  }
}