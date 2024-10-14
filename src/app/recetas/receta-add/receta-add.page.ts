import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  
import { RecetaService } from '../receta-list.service';  // Servicio API
import { CLRecetas } from '../model/ClReceta';  // Modelo de receta

@Component({
  selector: 'app-receta-add',
  templateUrl: './receta-add.page.html',
  styleUrls: ['./receta-add.page.scss'],
})
export class RecetaAddPage implements OnInit {
  recetaForm!: FormGroup;
  recetas: CLRecetas[] = [];  // Lista de recetas
  nextId: string = "1";  // ID inicial

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private recetaService: RecetaService,  // Servicio API
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecetasFromApi();  // Cargar las recetas existentes
    this.recetaForm = this.formBuilder.group({
      'titulo': [null, Validators.required],
      'descripcion': [null, Validators.required],
      'ingredientes': [null, Validators.required]
    });
  }

  // Obtener recetas existentes desde la API para calcular el nextId
  getRecetasFromApi() {
    this.recetaService.getAllRecetas().subscribe(
      (data: CLRecetas[]) => {
        this.recetas = data;
        this.generateNextId();  // Generar el próximo ID basado en los datos recibidos
      },
      (error) => {
        console.error('Error al obtener las recetas:', error);
        this.recetas = [];
      }
    );
  }

  // Generar el próximo ID basado en el ID más alto existente
  generateNextId() {
    if (this.recetas.length > 0) {
      const lastReceta = this.recetas.reduce((prev, current) => (prev.id > current.id) ? prev : current);
      this.nextId = ((+lastReceta.id) + 1).toString();  // Sumar 1 al último ID
    } else {
      this.nextId = "1";  // Si no hay recetas, el ID será 1
    }
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
      // Usar el nextId generado en lugar de UUID
      const id = this.nextId;  // Aquí usamos el siguiente ID calculado

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
      await this.recetaService.addReceta(receta).toPromise();  // Usar el método addReceta del servicio
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