import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../publicacion.service';


@Component({
  selector: 'app-desayuno',
  templateUrl: './desayuno.page.html',
  styleUrls: ['./desayuno.page.scss'],
})
export class DesayunoPage implements OnInit {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit() {
    this.cargarPublicacionesPorCategoria('Desayuno')
  }

  cargarPublicacionesPorCategoria(categoria: string) {
    this.publicacionService.getPublicacionesPorCategoria(categoria).subscribe(
      (data) => {
        this.publicaciones = data;
        console.log('Publicaciones:', this.publicaciones);
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
