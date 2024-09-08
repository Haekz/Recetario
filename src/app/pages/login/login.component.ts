import { Component, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';  
import { AlertController, LoadingController, IonModal, NavController } from '@ionic/angular'; 
import { OverlayEventDetail } from '@ionic/core/components'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';
  showPassword = false;
  loading = false;

  constructor(public router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public navCtrl: NavController) {}  // Inyecta el Router en el constructor

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    // Lógica de inicio de sesión

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circles',
    });

    const noCargar = await this.alertController.create({
      header: 'Login',
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

    if (this.username === 'admin' && this.password === 'admin') {
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();

      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    }, 900);
    } else {
        await noCargar.present();
      
    }
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }


  goToRegister() {
    this.loading = true; // Mostrar barra de progreso
    setTimeout(() => {
      this.loading = false; // Ocultar barra de progreso después de cargar
      this.navCtrl.navigateForward('/register'); // Navegar a la página de registro
    }, 1000); // Simular un tiempo de espera de 2 segundos
  }

}
