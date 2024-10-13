import { Component, OnInit } from '@angular/core';
import { CLRecetas } from '../model/ClReceta';  // Modelo de receta
import { RecetaService } from '../receta-list.service';  // Servicio de recetas
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-receta-all',
  templateUrl: './receta-all.page.html',
  styleUrls: ['./receta-all.page.scss'],
})
export class RecetaAllPage implements OnInit {
  recetas: CLRecetas[] = [];  // Arreglo para almacenar las recetas obtenidas

  constructor(
    private recetaService: RecetaService,  // Servicio de recetas
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  // Inicializamos el componente obteniendo todas las recetas
  ngOnInit() {
    this.getRecetas();
  }

  // Método para obtener todas las recetas
  async getRecetas() {
    const loading = await this.loadingController.create({
      message: 'Cargando recetas...'
    });
    await loading.present();

    this.recetaService.getAllRecetas().subscribe({
      next: (res) => {
        this.recetas = res;  // Asignamos las recetas obtenidas al arreglo
        loading.dismiss();
      },
      error: (err) => {
        console.error('Error al obtener recetas:', err);
        loading.dismiss();
        this.showAlert('Error', 'No se pudieron cargar las recetas. Intenta de nuevo más tarde.');
      }
    });
  }

  // Método para mostrar una alerta en caso de error
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
