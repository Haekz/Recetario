import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SqliteService } from 'src/app/services/sqlite.service';  // Servicio SQLite
import { CLRecetas } from '../model/ClReceta';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-receta-add',
  templateUrl: './receta-add.page.html',
  styleUrls: ['./receta-add.page.scss'],
})
export class RecetaAddPage implements OnInit {
  recetaForm!: FormGroup;
  selectedImage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private sqliteService: SqliteService,  // Inyectamos el servicio SQLite
    private router: Router
  ) {}

  ngOnInit() {
    this.recetaForm = this.formBuilder.group({
      'titulo': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'ingredientes': [null, Validators.required],
      'imagen': [null]
    });

    this.mostrarAviso();
  }

  // Método para abrir la cámara y capturar imagen
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    this.selectedImage = `data:image/jpeg;base64,${image.base64String}`;
    this.recetaForm.patchValue({ imagen: this.selectedImage });
  }

  async mostrarAviso() {
    const alert = await this.alertController.create({
      header: '¡Agregar Receta!',
      message: 'En esta sección puedes comentarnos tus recetas, con un título, una breve despcripción de su preparación y sus ingredientes; y con un poco de suerte !Puede Salir en el global! Buena Suerte.',
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  // Guardar receta solo en SQLite
  async onFormSubmit() {
    const loading = await this.loadingController.create({
      message: 'Guardando receta...'
    });
    await loading.present();

    const titulo = this.recetaForm.value.titulo;
    const descripcion = this.recetaForm.value.descripcion;
    const ingredientes = this.recetaForm.value.ingredientes;
    const imagen = this.recetaForm.value.imagen;

    try {
      // Crea un nuevo objeto receta
      const receta = new CLRecetas({ titulo, descripcion, ingredientes, imagen });

      // Guardar receta en SQLite
      await this.sqliteService.insertarReceta(receta.titulo, receta.descripcion, receta.ingredientes);
      console.log('Receta guardada en SQLite correctamente.');

      loading.dismiss();
      this.router.navigate(['/receta-list']);
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al guardar la receta.');
    }
  }

  // Mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


}