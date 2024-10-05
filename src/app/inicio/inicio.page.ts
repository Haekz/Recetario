import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  // Formulario reactivo para manejar el inicio de sesión
  loginForm: FormGroup;

  // Variables de instancia del componente
  showPassword = false; // Controla la visibilidad de la contraseña
  loading = false; // Controla la visibilidad de la barra de progreso

  // Constructor del componente, donde se inyectan los servicios necesarios
  constructor(
    private router: Router, // Servicio para navegar entre rutas
    private loadingController: LoadingController, // Servicio para mostrar barras de progreso
    private alertController: AlertController, // Servicio para mostrar alertas
    private navCtrl: NavController, // Servicio para navegación con historial
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private apliService: ApiService
  ) {
    // Inicialización del formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Método para manejar el inicio de sesión
  async onLogin() {
    // Verifica si el formulario es válido
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Favor de completar todos los campos requeridos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return; // Salir del método si el formulario es inválido
    }
  
    // Desestructuración de los valores del formulario
    const { username, password } = this.loginForm.value;

    // Mostrar la animación de carga
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
    });
    await loading.present(); // Presentar la animación de carga
  
    // Llamar al servicio de autenticación
    this.usuarioService.autenticarUsuario(username, password).subscribe({
      next: async (usuario) => {
        await loading.dismiss(); // Cerrar la animación de carga
        if (usuario) {
          // Guardar el usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify({ id: usuario.id, nombre: usuario.nombre }));
          localStorage.setItem('ingresado', 'true');

          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Has iniciado sesión correctamente.',
            buttons: ['Aceptar'],
          });
          await alert.present();
  
          // Crear NavigationExtras con el username
          const navigationExtras = {
            state: {
              username: username
            }
          };
  
          // Navegar a la página de inicio pasando el username
          this.router.navigate(['/home'], navigationExtras);
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos.',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      },
      error: async (err) => {
        await loading.dismiss(); // Cerrar la animación de carga
        console.error('Error al autenticar usuario:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; 
  }

  // Método para manejar la solicitud de restablecimiento de contraseña
  onResetPassword() {
    this.router.navigate(['/restar-contra']); // Cambia a la ruta de restablecimiento de contraseña
  }

  // Método para manejar la navegación a la página de registro
  goToRegister() {
    this.router.navigate(['/registro']); // Cambia a la ruta de registro
  }
}