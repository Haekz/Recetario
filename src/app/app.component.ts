import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    public alertController: AlertController,
    public navCtrl: NavController,
    public loadingController: LoadingController
  ) {}

  mostrarFooter(): boolean {
    // Define las rutas donde no quieres mostrar el footer
    const rutasSinFooter = ['/inicio', '/registro', '/restar-contra'];
    return !rutasSinFooter.includes(this.router.url);
  }

  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            // No hacer nada al cerrar el alert
          }
        },
        {
          text: 'Sí',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Saliendo...',
              spinner: 'crescent'
            });
            await loading.present();
            setTimeout(async () => {
              localStorage.removeItem('ingresado');
              await loading.dismiss();
              this.router.navigateByUrl('/inicio');
            }, 800);
          }
        }
      ]
    });

    await alert.present();
  }
}