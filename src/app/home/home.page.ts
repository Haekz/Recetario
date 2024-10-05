import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para manejar la navegación
import { AlertController, LoadingController } from '@ionic/angular';

interface NavigationState {
  username?: string; // Puede ser undefined si no se pasa
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string | undefined; // Puede ser undefined

  constructor(
    public router: Router,
    public alertController: AlertController, 
    public loadingController: LoadingController
  ) {// Verifica si hay navegación actual y si hay un estado
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      // Asigna el username del estado usando una conversión de tipo
      const state = navigation.extras.state as NavigationState;
      this.username = state.username; // Ahora TypeScript reconoce el tipo
    }}

  ngOnInit() {
    console.log('Username:', this.username);
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

}