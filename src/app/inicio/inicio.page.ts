import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  loginForm: FormGroup;
  showPassword = false; // Controla la visibilidad de la contraseña
  isLoading = false; // Cambié `loading` por `isLoading`

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    // Verifica si el usuario ya está autenticado
    if (this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private async showLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent',
    });
    await loading.present();
    return loading;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Favor de completar todos los campos requeridos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.isLoading = true; // Inicia la carga

    const loading = await this.showLoading('Cargando...');

    this.usuarioService.autenticarUsuario(username, password).subscribe({
      next: async (usuario) => {
        this.isLoading = false; // Finaliza la carga
        await loading.dismiss(); // Cierra la animación de carga
        if (usuario) {
          localStorage.setItem('usuario', JSON.stringify({ id: usuario.id, nombre: usuario.nombre }));
          localStorage.setItem('ingresado', 'true');

          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Has iniciado sesión correctamente.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          this.router.navigate(['/home'], { state: { username } });
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
        this.isLoading = false; // Finaliza la carga
        await loading.dismiss(); // Cierra la animación de carga
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; 
  }

  onResetPassword() {
    this.router.navigate(['/restar-contra']);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}