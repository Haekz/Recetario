import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { CLRecetas } from '../model/ClReceta';  // Modelo de receta
import { SqliteService } from 'src/app/services/sqlite.service';  // Servicio SQLite

@Component({
  selector: 'app-receta-detail',
  templateUrl: './receta-detail.page.html',
  styleUrls: ['./receta-detail.page.scss'],
})
export class RecetaDetailPage implements OnInit {
  receta: CLRecetas | undefined;  // Inicializamos la receta como indefinida

  constructor(
    private sqliteService: SqliteService,  // Servicio de SQLite
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Método que se ejecuta cuando se carga la página
  ngOnInit() {
    this.getRecetaFromSQLite();  // Cargar la receta desde SQLite
  }

  // Obtener la receta desde SQLite
  async getRecetaFromSQLite() {
    const recetaId = this.route.snapshot.paramMap.get('id');  // Obtener el ID de la receta de la URL
    if (!recetaId) return;  // Si no hay ID, no continuamos

    const loading = await this.loadingController.create({
      message: 'Cargando receta desde SQLite...'
    });
    await loading.present();

    try {
      const recetaLocal = await this.sqliteService.getRecetaById(+recetaId);  // Convertimos recetaId a number
      if (recetaLocal) {
        this.receta = recetaLocal;  // Asignar los datos de la receta obtenida localmente
      } else {
        this.showAlert('Error', 'No se encontró la receta en la base de datos local.');
      }
    } catch (error) {
      console.error('Error al obtener la receta desde SQLite:', error);
      this.showAlert('Error', 'Ocurrió un error al obtener la receta localmente.');
    }
    loading.dismiss();
  }

  // Método para eliminar una receta localmente en SQLite
  async delete(id: number) {  // Asegúrate de que el tipo es number
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
          
            try {
              await this.sqliteService.eliminarReceta(id);  // Eliminar la receta de SQLite usando el id numérico
              loading.dismiss();
              this.router.navigate(['/receta-list']);  // Redirigir al listado de recetas después de eliminar
            } catch (err) {
              console.error('Error al eliminar la receta:', err);
              loading.dismiss();
              this.showAlert('Error', 'Ocurrió un error al eliminar la receta.');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  // Método para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}