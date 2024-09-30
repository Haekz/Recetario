import { Component, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';  
import { AlertController, LoadingController, IonModal, NavController } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core/components'; 


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  
  // Variables de instancia del componente
  
  username: string = ''; // Almacena el nombre de usuario ingresado
  password: string = ''; // Almacena la contraseña ingresada
  showPassword = false; // Controla la visibilidad de la contraseña
  loading = false; // Controla la visibilidad de la barra de progreso

  // Constructor del componente, donde se inyectan los servicios necesarios
  constructor(
    public router: Router, // Servicio para navegar entre rutas
    public loadingController: LoadingController, // Servicio para mostrar barras de progreso
    public alertController: AlertController, // Servicio para mostrar alertas
    public navCtrl: NavController // Servicio para navegación con historial
  ) {}

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {

    // Cambia el estado de 'showPassword'
    this.showPassword = !this.showPassword; 
  }

  // Método para manejar el inicio de sesión
  async onLogin() {
    // Verificar si los campos están vacíos
    if (!this.username || !this.password) {
      const emptyFieldsAlert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa tanto el usuario como la contraseña.',
        buttons: ['OK'],
      });
      await emptyFieldsAlert.present();
      return;
    }
  
    // Crear y presentar un indicador de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circles',
    });
  
    // Crear una alerta para cuando el inicio de sesión falla
    const noCargar = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: 'Usuario o Contraseña incorrecta',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.username = "";
            this.password = "";
          }
        }
      ]
    });
  
    // Recuperar los datos del usuario guardados en localStorage
    const storedUserJson = localStorage.getItem('usuario');

    // Verificar si hay datos almacenados y parsear
    const storedUser = storedUserJson ? JSON.parse(storedUserJson) : null;

    // Verificar si existen datos en localStorage
    if (storedUser) {
      // Comparar las credenciales ingresadas con las guardadas
      if (this.username === storedUser.nombre && this.password === storedUser.contraseña) {
        await loading.present();
  
        setTimeout(async () => {
          // Guardar las credenciales en localStorage
          localStorage.setItem('usuario', JSON.stringify({
            username: this.username,
            password: this.password
          }));
  
          await loading.dismiss();
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/home']);
        }, 900);
      } else {
        await noCargar.present();
      }
    } else {
      await noCargar.present();
    }
  }

  // Método para manejar la solicitud de restablecimiento de contraseña
  onResetPassword() {

    // Navegar a la página de restablecimiento de contraseña
    this.router.navigate(['/restar-contra']); 

  }

  // Método para manejar la navegación a la página de registro
  goToRegister() {

     // Mostrar barra de progreso
    this.loading = true;

    // Simular un tiempo de espera antes de navegar
    setTimeout(() => {

      // Ocultar barra de progreso después de la simulación
      this.loading = false; 

      // Navegar a la página de registro
      this.navCtrl.navigateForward('/registro');
    }, 1000);
  }

}
