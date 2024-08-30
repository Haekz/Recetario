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
    if (this.username === 'admin' && this.password === 'admin') {
      // Credenciales válidas, redirige a la página de inicio
      this.router.navigate(['/home']);
    } else {
      // Muestra un mensaje de error si las credenciales no son correctas
      alert('Invalid credentials');
    }
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
