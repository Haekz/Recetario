import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  onResetPassword() {
    if (this.email) {
      // Aquí iría la lógica para enviar el correo con el enlace de restablecimiento
      alert(`Se ha enviado un enlace de restablecimiento a ${this.email}`);
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, ingrese un correo electrónico válido.');
    }
  }
}
