import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service'; // Importa el servicio de SQLite
import { UsuarioService } from '../app/services/usuario/usuario.service'; // Importa el servicio de Usuario
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private readonly router: Router,
    public alertController: AlertController,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public sqliteService: SqliteService, // Inyecta el servicio de SQLite
    public platform: Platform, // Inyecta Platform
    public usuarioService: UsuarioService, // Inyecta el servicio de Usuario
    public menuController: MenuController
  ) {
    this.initializeApp(); // Llama a la función de inicialización al iniciar la app
  }

  // Inicializar la aplicación
  initializeApp() {
    this.platform.ready().then(async () => {
      try {
        await this.sqliteService.initializeDatabase();
        console.log('Base de datos inicializada correctamente.');
      } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
      }
    });
  }

  closeMenu() {
    this.menu.close();
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
          role: 'cancel', // Añadido para mejorar la accesibilidad
        },
        {
          text: 'Sí',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Saliendo...',
              spinner: 'crescent'
            });
            await loading.present();

            // Llamar al método logout del servicio UsuarioService
            this.usuarioService.logout(); // Elimina el usuario de localStorage

            await loading.dismiss(); // Descartar el loading
            this.router.navigateByUrl('/inicio'); // Redirigir a la página de inicio
          }
        }
      ]
    });

    await alert.present(); // Presentar el alert
  }

  
}