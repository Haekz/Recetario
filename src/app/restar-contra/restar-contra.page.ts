import { Component } from '@angular/core'; // Importa el decorador Component para definir el componente
import { Router } from '@angular/router'; // Importa Router para la navegación entre rutas

@Component({
  selector: 'app-restar-contra',
  templateUrl: './restar-contra.page.html',
  styleUrls: ['./restar-contra.page.scss'],
})
export class RestarContraPage {

  email: string = ''; // Variable para almacenar el correo electrónico ingresado

  // Constructor del componente, inyecta el servicio Router para la navegación
  constructor(private router: Router) {}

  // Método para manejar el restablecimiento de la contraseña
  onResetPassword() {
    if (this.email) {
      // Aquí iría la lógica para enviar el correo con el enlace de restablecimiento
      // Muestra una alerta simulando el envío del enlace de restablecimiento
      alert(`Se ha enviado un enlace de restablecimiento a ${this.email}`);
      
      // Navega a la página de inicio de sesión después de enviar el enlace
      this.router.navigate(['/login']);
      
    } else {
      // Muestra una alerta si el campo de correo electrónico está vacío
      alert('Por favor, ingrese un correo electrónico válido.');
    }
  }
}