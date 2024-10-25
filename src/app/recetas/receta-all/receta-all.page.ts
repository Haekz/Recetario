import { Component, OnInit } from '@angular/core';
import { CLRecetas } from '../model/ClReceta';  // Modelo de receta
import { SqliteService } from 'src/app/services/sqlite.service';  // Servicio de SQLite
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-receta-all',
  templateUrl: './receta-all.page.html',
  styleUrls: ['./receta-all.page.scss'],
})
export class RecetaAllPage implements OnInit {
  recetas: CLRecetas[] = [];  // Arreglo para almacenar las recetas obtenidas

  constructor(
    private sqliteService: SqliteService,  // Servicio de SQLite
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  // Inicializar el componente obteniendo todas las recetas desde SQLite
  ngOnInit() {
    this.getRecetasFromSQLite();
  }

  // Método para obtener todas las recetas desde SQLite
  async getRecetasFromSQLite() {
    const loading = await this.loadingController.create({
      message: 'Cargando recetas desde la base de datos local...'
    });
    await loading.present();

    try {
      this.recetas = await this.sqliteService.getRecetas();  // Obtener recetas desde SQLite
      if (this.recetas.length === 0) {
        this.showAlert('Información', 'No hay recetas disponibles en la base de datos local.');
      }
    } catch (error) {
      console.error('Error al obtener recetas desde SQLite:', error);
      this.showAlert('Error', 'Ocurrió un error al cargar las recetas desde la base de datos local.');
    } finally {
      loading.dismiss();
    }
  }

  // Método para mostrar alertas en caso de error o información
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}