import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { CLRecetas } from '../model/ClReceta';  // Modelo de receta
import { RecetaService } from '../receta-list.service';  // Servicio de recetas

@Component({
  selector: 'app-receta-detail',
  templateUrl: './receta-detail.page.html',
  styleUrls: ['./receta-detail.page.scss'],
})
export class RecetaDetailPage implements OnInit {
  receta: CLRecetas | undefined;  // Inicializamos la receta como indefinida

  constructor(
    private recetaService: RecetaService,  // Servicio de recetas
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Método que se ejecuta cuando se carga la página
  ngOnInit() {
    this.getReceta();
  }

  // Método que obtiene una receta específica por su ID
  async getReceta() {
    const recetaId = this.route.snapshot.paramMap.get('id');  // Obtener ID de la URL
    if (!recetaId) return;  // Si no hay ID, salir de la función

    const loading = await this.loadingController.create({
      message: 'Cargando receta...'
    });
    await loading.present();

    this.recetaService.getRecetaById(recetaId)
      .subscribe({
        next: (res) => {
          this.receta = res;  // Asignar el resultado a la receta
          loading.dismiss();  // Quitar el loading
        },
        error: (err) => {
          console.error('Error al obtener la receta:', err);
          loading.dismiss();
        }
      });
  }

  // Método para eliminar una receta
  async delete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro que deseas eliminar esta receta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Eliminando receta...'
            });
            await loading.present();

            this.recetaService.deleteReceta(id).subscribe({
              next: () => {
                loading.dismiss();
                this.router.navigate(['/receta-list']);  // Redirigir al listado de recetas después de eliminar
              },
              error: (err) => {
                console.error('Error al eliminar la receta:', err);
                loading.dismiss();
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}

