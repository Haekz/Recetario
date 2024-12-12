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

  constructor(public publicacionService: PublicacionService, public router: Router) {}

  ngOnInit() {
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.publicacionService.getPublicaciones().subscribe(
      (data) => {
        // Inicializar cada publicación con la propiedad favorito
        this.publicaciones = data.map(pub => ({ ...pub, favorito: false }));
      },
      (error) => {
        console.error('Error al cargar publicaciones:', error);
      }
    );
  }

  toggleFavorito(publicacion: any) {
    publicacion.favorito = !publicacion.favorito;
    if (publicacion.favorito) {
      this.publicacionService.agregarAFavoritos(publicacion);
    } else {
      this.publicacionService.eliminarDeFavoritos(publicacion.id);
    }
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}