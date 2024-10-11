import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-restar-contra',
  templateUrl: './restar-contra.page.html',
  styleUrls: ['./restar-contra.page.scss'],
})
export class RestarContraPage {
  nombre: string = ''; // Nombre ingresado por el usuario
  nuevaPassword: string = ''; // Nueva contraseña
  passwordActual: string = ''; // Contraseña actual del usuario
  hidePassword: boolean = true; // Controlar la visibilidad de la contraseña


  constructor(
    public router: Router,
    public usuarioService: UsuarioService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  // Método para cambiar la contraseña
  async cambiarPassword() {
    const loading = await this.loadingController.create({
      message: 'Actualizando contraseña...',
    });
    await loading.present();
  
    // Obtiene el usuario por su nombre
    this.usuarioService.obtenerUsuarioPorNombre(this.nombre).subscribe(
      async (usuarios) => {
        if (usuarios && usuarios.length > 0) {
          const usuario = usuarios[0]; // Obtenemos el primer usuario
          const userId = usuario.id;
          this.passwordActual = usuario.password; // Guardamos la contraseña actual

          // Verifica que userId no sea undefined
          if (userId) {
            // Verifica que la nueva contraseña no sea la misma que la actual
            if (this.nuevaPassword === this.passwordActual) {
              await loading.dismiss();
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'La nueva contraseña no puede ser la misma que la anterior.',
                buttons: ['OK'],
              });
              await alert.present();
              return;
            }

            // Actualiza la contraseña
            this.usuarioService.actualizarPassword(userId, this.nuevaPassword).subscribe(
              async () => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Éxito',
                  message: 'Contraseña actualizada correctamente.',
                  buttons: ['OK'],
                });
                await alert.present();
  
                // Navega a otra página (por ejemplo, a la página de inicio)
                await alert.onDidDismiss();
                this.router.navigate(['/inicio']); // Redirige a la página de inicio
              },
              async (error) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Error',
                  message: 'Hubo un error al actualizar la contraseña.',
                  buttons: ['OK'],
                });
                await alert.present();
              }
            );
          } else {
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'ID de usuario no encontrado.',
              buttons: ['OK'],
            });
            await alert.present();
          }
        } else {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Usuario no encontrado.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
      async (error) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al buscar el usuario.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Método para validar que la nueva contraseña cumpla con los requisitos
  validarPassword(password: string): boolean {
    // Expresión regular para al menos 4 números, 3 caracteres alfabéticos, y 1 mayúscula
    const regex = /^(?=(.*[0-9]){4})(?=(.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}