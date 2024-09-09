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
    { name: 'Desayuno', image: 'assets/img/desayuno.jpg', resumen: 'Conoce algunos desayunos para empezar el día con muchas ganas', category: 'Breakfast' },
    { name: 'Ensalada', image: 'assets/img/ensalada.jpg', resumen: 'Conoce algunas ensaldas para acompañar el almuero del día', category: 'Salad' },
    { name: 'Almuerzo', image: 'assets/img/almuerzo.jpg', resumen: 'Conoce algunos almuerzos para disfrutar tu tarde del día', category: 'Lunch' },
    { name: 'Once', image: 'assets/img/once.jpg', resumen: 'Conoce algunas onces para finalizar tu día', category: 'Once' }
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
    console.log(recipe.image); // Verifica la ruta de la imagen
    this.router.navigate(['/recipe', recipe.name]);
  }
}
