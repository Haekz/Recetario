import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-result',
  templateUrl: './buscar-result.page.html',
  styleUrls: ['./buscar-result.page.scss'],
})
export class BuscarResultPage{

  recipes = [
    { name: 'Desayuno', image: 'assets/img/desayuno.jpg', resumen: 'Conoce algunos desayunos para empezar el día con muchas ganas', category: 'Breakfast' },
    { name: 'Ensalada', image: 'assets/img/ensalada.jpg', resumen: 'Conoce algunas ensaldas para acompañar el almuero del día', category: 'Salad' },
    { name: 'Almuerzo', image: 'assets/img/almuerzo.jpg', resumen: 'Conoce algunos almuerzos para disfrutar tu tarde del día', category: 'Lunch' },
    { name: 'Once', image: 'assets/img/once.jpg', resumen: 'Conoce algunas onces para finalizar tu día', category: 'Once' }
  ];

  constructor(private readonly router: Router, public alertController: AlertController,
    public loadingController: LoadingController) {}

  // Método para navegar entre las pestañas
  navigateTo(route: string) {

    // Redirige a la ruta seleccionada
    this.router.navigate([`/${route}`]); 

  }

  // Método para salir y cerrar sesión
  //async salir() {
  //  const alert = await this.alertController.create({
  //    header: 'Salir',
  //    message: '¿Deseas salir?',
  //    buttons: [
  //      {
  //        text: 'No',
  //        role: 'cancel'
  //      }, 
  //      {
  //        text: 'Sí',
  //        handler: () => {
  //          //localStorage.removeItem('ingresado'); // Lógica de cierre de sesión
  //          this.router.navigateByUrl('login');
  //        }
  //      }
  //    ]
  //  });
  //  await alert.present();
  //}


  async salir() {
    // Método para salir y cerrar sesión
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

  // Método para abrir detalles de receta
  openRecipe(recipe: any) {
    console.log(recipe.image); // Verifica la ruta de la imagen
    this.router.navigate(['/recipe', recipe.name]);
  }
}
