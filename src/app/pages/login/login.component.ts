import { Component } from '@angular/core'; // Importa Component desde Angular Core
import { Router } from '@angular/router';  // Importa el Router para la navegación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}  // Inyecta el Router en el constructor

  onLogin() {
    // Lógica de inicio de sesión
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/home']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  // Método para manejar la navegación al registro
  goToRegister() {
    console.log('Navigating to register');
    this.router.navigate(['/register']);
  }
  
}
