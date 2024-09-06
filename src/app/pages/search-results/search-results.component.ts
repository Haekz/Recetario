import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  recipes = [
    { name: 'Pancakes', image: 'assets/images/pancakes.jpg', category: 'Breakfast' },
    { name: 'Caesar Salad', image: 'assets/images/salad.jpg', category: 'Lunch' },
    { name: 'Steak', image: 'assets/images/steak.jpg', category: 'Dinner' }
  ];

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
