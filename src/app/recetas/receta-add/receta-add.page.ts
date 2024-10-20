import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RecetaService } from '../receta-list.service';
import { CLRecetas } from '../model/ClReceta';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-receta-add',
  templateUrl: './receta-add.page.html',
  styleUrls: ['./receta-add.page.scss'],
})
export class RecetaAddPage implements OnInit {
  recetaForm!: FormGroup;
  recetas: CLRecetas[] = [];
  nextId: string = "1";
  selectedImage: string | null = null;  // Añadimos la propiedad selectedImage

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private recetaService: RecetaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecetasFromApi();
    this.recetaForm = this.formBuilder.group({
      'titulo': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'ingredientes': [null, Validators.required],
      'imagen': [null]
    });
  }

  // Obtener recetas existentes
  getRecetasFromApi() {
    this.recetaService.getAllRecetas().subscribe(
      (data: CLRecetas[]) => {
        this.recetas = data;
        this.generateNextId();
      },
      (error) => {
        console.error('Error al obtener las recetas:', error);
        this.recetas = [];
      }
    );
  }

  // Generar próximo ID
  generateNextId() {
    if (this.recetas.length > 0) {
      const lastReceta = this.recetas.reduce((prev, current) => (prev.id > current.id) ? prev : current);
      this.nextId = ((+lastReceta.id) + 1).toString();
    } else {
      this.nextId = "1";
    }
  }

  // Método para abrir la cámara
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera  // Cambia a CameraSource.Photos para abrir galería
    });

    this.selectedImage = `data:image/jpeg;base64,${image.base64String}`;
    this.recetaForm.patchValue({ imagen: this.selectedImage });
  }

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
      const id = this.nextId;
      const receta = new CLRecetas({ id, titulo, descripcion, ingredientes, imagen });

      await this.sendRecetaToAPI(receta);

      loading.dismiss();
      this.router.navigate(['/receta-list']);
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      loading.dismiss();
      this.showAlert('Error', 'Ocurrió un error al guardar la receta.');
    }
  }

  async sendRecetaToAPI(receta: CLRecetas) {
    try {
      await this.recetaService.addReceta(receta).toPromise();
      console.log('Receta enviada a la API correctamente.');
    } catch (error) {
      console.error('Error al enviar la receta a la API:', error);
      this.showAlert('Sin Conexión', 'No se pudo enviar la receta a la API, se intentará más tarde.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
