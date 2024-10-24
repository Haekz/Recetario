import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLRecetas } from '../model/ClReceta'; // Modelo de receta
import { SqliteService } from 'src/app/services/sqlite.service';  // Servicio SQLite

@Component({
  selector: 'app-receta-edit',
  templateUrl: './receta-edit.page.html',
  styleUrls: ['./receta-edit.page.scss'],
})
export class RecetaEditPage implements OnInit {
  recetaForm!: FormGroup;
  receta: CLRecetas = { id: 0, titulo: '', descripcion: '', ingredientes: '' };  // Cambiamos id a 0
  id: number = 0;  // id como número

  constructor(
    private sqliteService: SqliteService,  // Usamos el servicio SQLite
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id']; // Convertimos el ID de la URL a number
    this.getRecetaFromSQLite(this.id); // Cargamos la receta con el ID desde SQLite
    this.recetaForm = this.formBuilder.group({
      'titulo': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'ingredientes': [null, Validators.required]
    });
  }

  // Obtener la receta desde SQLite
  async getRecetaFromSQLite(id: number) {
    const loading = await this.loadingController.create({
      message: 'Cargando receta...'
    });
    await loading.present();

    try {
      const recetaLocal = await this.sqliteService.getRecetaById(id);  // Obtener la receta desde SQLite
      if (recetaLocal) {
        this.receta = recetaLocal;
        this.recetaForm.setValue({
          titulo: this.receta.titulo,
          descripcion: this.receta.descripcion,
          ingredientes: this.receta.ingredientes
        });
      } else {
        this.showAlert('Error', 'No se encontró la receta en la base de datos local.');
      }
    } catch (error) {
      console.error('Error al obtener la receta desde SQLite:', error);
      this.showAlert('Error', 'Ocurrió un error al cargar la receta.');
    } finally {
      loading.dismiss();
    }
  }

  // Enviar el formulario para actualizar la receta en SQLite
  async onFormSubmit() {
    const loading = await this.loadingController.create({
      message: 'Actualizando receta...'
    });
    await loading.present();

    this.receta.titulo = this.recetaForm.value.titulo;
    this.receta.descripcion = this.recetaForm.value.descripcion;
    this.receta.ingredientes = this.recetaForm.value.ingredientes;

    try {
      await this.sqliteService.updateReceta(this.id, this.receta.titulo, this.receta.descripcion, this.receta.ingredientes);  // Actualizar en SQLite
      loading.dismiss();
      this.router.navigate(['/receta-list']);  // Redirigir a la lista de recetas después de actualizar
    } catch (error) {
      console.error('Error al actualizar la receta en SQLite:', error);
      loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al actualizar la receta.');
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