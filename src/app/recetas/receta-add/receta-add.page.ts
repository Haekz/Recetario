import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  
import { RecetaService } from '../receta-list.service';  // Servicio API
import { CLRecetas } from '../model/ClReceta';  // Modelo de receta
import { v4 as uuidv4 } from 'uuid';  // Importar UUID

@Component({
  selector: 'app-receta-add',
  templateUrl: './receta-add.page.html',
  styleUrls: ['./receta-add.page.scss'],
})
export class RecetaAddPage implements OnInit {
  recetaForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private recetaService: RecetaService,  // Servicio API
    private router: Router
  ) {}

  ngOnInit() {
    this.recetaForm = this.formBuilder.group({
      'titulo': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'ingredientes': [null, Validators.required]
    });
  }

  async onFormSubmit() {
    const loading = await this.loadingController.create({
      message: 'Guardando receta...'
    });
    await loading.present();

    const titulo = this.recetaForm.value.titulo;
    const descripcion = this.recetaForm.value.descripcion;
    const ingredientes = this.recetaForm.value.ingredientes;

    try {
      // Generar un ID único usando UUID
      const id = uuidv4();  // Aquí generamos un ID único para la receta

      // Crear la receta con el ID generado
      const receta = new CLRecetas({ id, titulo, descripcion, ingredientes });

      // Enviar la receta a la API
      await this.sendRecetaToAPI(receta);

      loading.dismiss();
      this.router.navigate(['/receta-list']);  // Redirigir a la lista de recetas
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al guardar la receta.');
    }
  }

  // Enviar la receta a la API
  async sendRecetaToAPI(receta: CLRecetas) {
    try {
      await this.recetaService.sendRecetaToAPI(receta).toPromise();
      console.log('Receta enviada a la API correctamente.');
    } catch (error) {
      console.error('Error al enviar la receta a la API:', error);
      this.showAlert('Sin Conexión', 'No se pudo enviar la receta a la API, se intentará más tarde.');
    }
  }

  // Mostrar alerta en caso de error
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}