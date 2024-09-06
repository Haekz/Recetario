import { Component } from '@angular/core'; // Importa Component desde Angular Core
import { Router } from '@angular/router';  // Importa el Router para la navegación
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private loadingController: LoadingController) {}  // Inyecta el Router en el constructor

  async onLogin() {
    // Lógica de inicio de sesión

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'circles',
    });

    if (this.username === 'admin' && this.password === 'admin') {
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();

      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    }, 1500);
    } else {
      alert('Credenciales incorrectas');
    }
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }


  goToRegister() {
    console.log('Navigating to register');
    this.router.navigate(['/register']);
  }

}
