import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para manejar la navegación
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Admin'; // Aquí puedes reemplazar con el nombre real del usuario

  constructor(private router: Router, public alertController: AlertController, public NavController: NavController) {} // Inyecta el Router en el constructor

  ngOnInit() {
    // Puedes agregar lógica adicional aquí si es necesario
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]); // Navega a la ruta especificada
  }

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
