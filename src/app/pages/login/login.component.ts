import { Component } from '@angular/core'; // Importa Component desde Angular Core
import { Router } from '@angular/router';  // Importa el Router para la navegación
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(public router: Router, public loadingController: LoadingController, public alertController: AlertController) {}  // Inyecta el Router en el constructor

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
    console.log('Navegaciòn registrada');
    this.router.navigate(['/register']);
  }

}
