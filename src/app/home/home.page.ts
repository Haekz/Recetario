import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para manejar la navegación
import { AlertController, LoadingController } from '@ionic/angular';

interface NavigationState { // Define la interfaz para el estado de navegación
  username: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';

  constructor(
    private router: Router,
    public alertController: AlertController, 
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    const state = navigation.extras.state as NavigationState; // Realiza el casting
    this.username = state.username; // Accede a la propiedad username
  }
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
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
              //localStorage.removeItem('ingresado');
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