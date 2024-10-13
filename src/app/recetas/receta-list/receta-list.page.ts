import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLRecetas } from '../model/ClReceta';
import { RecetaService } from '../receta-list.service'; // Servicio de recetas

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.page.html',
  styleUrls: ['./receta-list.page.scss'],
})
export class RecetaListPage implements OnInit {
  recetas: CLRecetas[] = []; // Arreglo para almacenar las recetas

  constructor(
    public recetaService: RecetaService,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  // Usamos ngOnInit para la primera carga
  ngOnInit() {
    this.getRecetas();
  }

  // Cada vez que se muestra la página, volvemos a cargar las recetas
  ionViewWillEnter() {
    this.getRecetas();
  }

  // Método para obtener las recetas desde el servicio
  async getRecetas() {
    const loading = await this.loadingController.create({
      message: 'Cargando recetas...'
    });
    await loading.present();

    this.recetaService.getAllRecetas().subscribe({
      next: (res) => {
        this.recetas = res; // Asigna el resultado al arreglo de recetas
        loading.dismiss(); // Oculta el indicador de carga
      },
      error: (err) => {
        console.error('Error al obtener recetas:', err);
        loading.dismiss(); // Oculta el indicador de carga en caso de error
      }
    });
  }
}