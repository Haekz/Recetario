import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLRecetas } from '../model/ClReceta'; // Modelo de receta
import { RecetaService } from '../receta-list.service'; // Servicio de recetas

@Component({
  selector: 'app-receta-edit',
  templateUrl: './receta-edit.page.html',
  styleUrls: ['./receta-edit.page.scss'],
})
export class RecetaEditPage implements OnInit {
  recetaForm!: FormGroup;
  receta: CLRecetas = { id: '', titulo: '', descripcion: '', ingredientes: '' };
  id: string = '';

  constructor(
    private recetaService: RecetaService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; // Obtenemos el ID de la receta de la URL
    this.getReceta(this.id); // Cargamos la receta con el ID
    this.recetaForm = this.formBuilder.group({
      'titulo': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'ingredientes': [null, Validators.required]
    });
  }

  async getReceta(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando receta...'
    });
    await loading.present();

    // Llamamos al servicio para obtener la receta
    this.recetaService.getRecetaById(id).subscribe({
      next: (data) => {
        this.receta = data;
        this.recetaForm.setValue({
          titulo: this.receta.titulo,
          descripcion: this.receta.descripcion,
          ingredientes: this.receta.ingredientes
        });
        loading.dismiss();
      },
      error: (err) => {
        console.error('Error al obtener la receta:', err);
        loading.dismiss();
      }
    });
  }

  async onFormSubmit() {
    const loading = await this.loadingController.create({
      message: 'Actualizando receta...'
    });
    await loading.present();

    this.receta.titulo = this.recetaForm.value.titulo;
    this.receta.descripcion = this.recetaForm.value.descripcion;
    this.receta.ingredientes = this.recetaForm.value.ingredientes;

    // Llamamos al servicio para actualizar la receta
    this.recetaService.updateReceta(this.id, this.receta).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigate(['/receta-list']); // Redirigir a la lista de recetas
      },
      error: (err) => {
        console.error('Error al actualizar la receta:', err);
        loading.dismiss();
        this.showAlert('Error', 'Ocurrió un error al actualizar la receta.');
      }
    });
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
