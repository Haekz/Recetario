import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para manejar la navegación

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Admin'; // Aquí puedes reemplazar con el nombre real del usuario

  constructor(private router: Router) {} // Inyecta el Router en el constructor

  ngOnInit() {
    // Puedes agregar lógica adicional aquí si es necesario
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]); // Navega a la ruta especificada
  }
}
