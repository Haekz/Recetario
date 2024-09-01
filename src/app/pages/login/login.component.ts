import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Aquí iría la lógica de autenticación real
    if (this.username === 'bnicovani' && this.password === '12345') {
      // Credenciales válidas, redirige a la página de inicio
      this.router.navigate(['/home']);
    } else {
      // Muestra un mensaje de error si las credenciales no son correctas
      alert('Contraseña o usuario incorrecto');
    }
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }  
}
