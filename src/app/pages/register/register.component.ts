import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    // Aquí iría la lógica para registrar al usuario
    alert('Registro exitoso');
    this.router.navigate(['/login']); // Redirige al login después de registrar
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navega al login si ya tiene una cuenta
  }
}
