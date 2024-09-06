import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para manejar la navegación
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Admin'; // Aquí puedes reemplazar con el nombre real del usuario

  constructor(private router: Router, public alertController: AlertController, public NavController: NavController, public loadingController: LoadingController) {} // Inyecta el Router en el constructor

  ngOnInit() {
    // Puedes agregar lógica adicional aquí si es necesario
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
              this.router.navigateByUrl('login'); 
            }, 1500);
          }
        }
      ]
    });

    await alert.present();
  }
}
 