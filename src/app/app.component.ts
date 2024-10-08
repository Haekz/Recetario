import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service'; // Importa el servicio de SQLite

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
    public loadingController: LoadingController,
    private sqliteService: SqliteService, // Inyecta el servicio de SQLite
    private platform: Platform // Inyecta Platform
  ) {
    this.initializeApp(); // Llama a la función de inicialización al iniciar la app
  }

  // Inicializar la aplicación (solución combinada)
  initializeApp() {
    this.platform.ready().then(() => {
      this.sqliteService.testDatabase(); // Llama al método de prueba para inicializar y verificar SQLite
      this.sqliteService.initializeDatabase(); // Inicializa la base de datos
    });
  }

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
