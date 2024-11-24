import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../publicacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionService, private router: Router) {}

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.publicacionService.getPublicaciones().subscribe(
      (data) => {
        this.publicaciones = data; // Asigna los datos a la variable de publicaciones
      },
      (error) => {
        console.error('Error al cargar publicaciones:', error);
      }
    );
  }

  // Función para truncar texto
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

}
