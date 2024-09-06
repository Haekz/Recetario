import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private readonly router: Router  , public alertController: AlertController, public navCtrl: NavController) {}

  async salir(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas Salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        }, {
          text: 'Si',
          handler: () => {              
            localStorage.removeItem('ingresado');
            this.router.navigateByUrl('login');
          }
        }
      ]
    });
    
    await alert.present();
  }
}
