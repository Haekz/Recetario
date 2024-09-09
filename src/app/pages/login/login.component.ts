import { Component, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';  
import { AlertController, LoadingController, IonModal, NavController } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core/components'; 

@Component({
  selector: 'app-login', // Selector para el componente, usado en las plantillas HTML
  templateUrl: './login.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./login.component.scss'], // Ruta al archivo de estilos SCSS del componente
})
export class LoginComponent {
  
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

    // Crear y presentar un indicador de carga
    const loading = await this.loadingController.create({

      // Mensaje que se muestra en el indicador
      message: 'Iniciando sesión...', 

      // Tipo de spinner que se muestra
      spinner: 'circles', 
    });

    // Crear una alerta para cuando el inicio de sesión falla
    const noCargar = await this.alertController.create({

      // Título de la alerta
      header: 'Login', 

      // Mensaje de la alerta
      message: 'Usuario o Contraseña incorrecta', 
      buttons: [
        {
          text: 'Ok', 
          
          // Texto del botón de la alerta
          handler: () => {

            // Limpiar campos de entrada al presionar 'Ok'
            this.username = "";
            this.password = "";
          }
        }
      ]
    });

    // Validar credenciales de inicio de sesión
    if (this.username === 'admin' && this.password === 'admin') {

      // Mostrar el indicador de carga
      await loading.present(); 

      // Simular una operación de carga de 900 ms
      setTimeout(async () => {

        // Ocultar el indicador de carga
        await loading.dismiss(); 

        // Log de éxito
        console.log('Inicio de sesión exitoso'); 

        // Navegar a la página principal
        this.router.navigate(['/home']); 
      }, 900);
    } else {

      // Mostrar alerta de error
      await noCargar.present(); 
    }
  }

  // Método para manejar la solicitud de restablecimiento de contraseña
  onResetPassword() {

    // Navegar a la página de restablecimiento de contraseña
    this.router.navigate(['/reset-password']); 

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
      this.navCtrl.navigateForward('/register');
    }, 1000);
  }

}
