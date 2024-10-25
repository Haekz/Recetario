import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLRecetas } from '../model/ClReceta';
import { RecetaService } from '../receta-list.service'; // Servicio de recetas
import { SqliteService } from 'src/app/services/sqlite.service'; // Servicio de SQLite

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.page.html',
  styleUrls: ['./receta-list.page.scss'],
})
export class RecetaListPage implements OnInit {
  recetas: CLRecetas[] = []; // Arreglo para almacenar las recetas locales
  recetasAPI: CLRecetas[] = []; // Arreglo para almacenar las recetas de la API
  selectedRecetas: Set<number> = new Set<number>(); // Conjunto para almacenar IDs de recetas seleccionadas

  constructor(
    private recetaService: RecetaService,
    private sqliteService: SqliteService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit() {
    this.getRecetasFromSQLite();
  }

  ionViewWillEnter() {
    this.getRecetasFromSQLite();
  }

  // Método para obtener recetas de SQLite
  async getRecetasFromSQLite() {
    const loading = await this.loadingController.create({
      message: 'Cargando recetas locales...'
    });
    await loading.present();

    try {
      this.recetas = await this.sqliteService.getRecetas();
    } catch (error) {
      console.error('Error al cargar recetas locales:', error);
      this.showAlert('Error', 'No se pudieron cargar las recetas locales.');
    } finally {
      loading.dismiss();
    }
  }

  // Método para sincronizar todas las recetas con la API y luego eliminarlas de SQLite
  async syncRecetasWithAPI() {
    const loading = await this.loadingController.create({
      message: 'Sincronizando recetas con el servidor...'
    });
    await loading.present();

    try {
      const recetasLocales = await this.sqliteService.getRecetas();
      for (const receta of recetasLocales) {
        await this.recetaService.addReceta(receta).toPromise();
      }
      await this.sqliteService.limpiarRecetas();
      this.recetas = [];
      this.showAlert('Éxito', 'Las recetas se sincronizaron y eliminaron localmente.');
    } catch (error) {
      console.error('Error al sincronizar recetas:', error);
      this.showAlert('Error', 'No se pudo sincronizar con el servidor.');
    } finally {
      loading.dismiss();
    }
  }

  // Método para obtener recetas desde la API
  async getRecetasFromAPI() {
    const loading = await this.loadingController.create({
      message: 'Cargando recetas desde la API...'
    });
    await loading.present();

    try {
      this.recetasAPI = (await this.recetaService.getAllRecetas().toPromise()) ?? []; // Manejo del tipo
    } catch (error) {
      console.error('Error al cargar recetas de la API:', error);
      this.showAlert('Error', 'No se pudieron cargar las recetas de la API.');
    } finally {
      loading.dismiss();
    }
  }

  // Método para seleccionar o deseleccionar recetas de la API
  toggleSelection(recetaId: number) {
    if (this.selectedRecetas.has(recetaId)) {
      this.selectedRecetas.delete(recetaId);
    } else {
      this.selectedRecetas.add(recetaId);
    }
  }

  // Método para recuperar recetas seleccionadas desde la API y guardarlas en SQLite
  async recuperarRecetas() {
    const loading = await this.loadingController.create({
      message: 'Recuperando recetas seleccionadas...'
    });
    await loading.present();

    try {
      const recetasToSave = this.recetasAPI.filter(receta => this.selectedRecetas.has(receta.id));

      // Guardar en SQLite y eliminar de la API
      for (const receta of recetasToSave) {
        await this.sqliteService.insertarReceta(receta.titulo, receta.descripcion, receta.ingredientes);
        await this.recetaService.deleteReceta(Number(receta.id)).toPromise();
      }

      // Actualizar el estado de recetas locales y de la API
      this.getRecetasFromSQLite();
      this.getRecetasFromAPI();
      this.selectedRecetas.clear(); // Limpiar selección
      this.showAlert('Éxito', 'Recetas seleccionadas recuperadas y guardadas en SQLite.');
    } catch (error) {
      console.error('Error al recuperar recetas:', error);
      this.showAlert('Error', 'No se pudieron recuperar las recetas seleccionadas.');
    } finally {
      loading.dismiss();
    }
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