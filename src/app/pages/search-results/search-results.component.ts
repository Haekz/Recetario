import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private readonly router: Router, public alertController: AlertController) {}

  // Método para navegar entre las pestañas
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Redirige a la ruta seleccionada
  } // Cierra el método correctamente

  // Método para salir y cerrar sesión
  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas salir?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, 
        {
          text: 'Sí',
          handler: () => {
            localStorage.removeItem('ingresado'); // Lógica de cierre de sesión
            this.router.navigateByUrl('login');
          }
        }
      ]
    });
    await alert.present();
  }

  // Método para abrir detalles de receta
  openRecipe(recipe: any) {
    this.router.navigate(['/recipe', recipe.name]); // Navegar a los detalles de la receta
  }
}
