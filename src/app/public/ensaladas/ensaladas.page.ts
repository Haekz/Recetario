import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../publicacion.service';


@Component({
  selector: 'app-ensaladas',
  templateUrl: './ensaladas.page.html',
  styleUrls: ['./ensaladas.page.scss'],
})
export class EnsaladasPage implements OnInit {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit() {
    this.cargarPublicacionesPorCategoria('Ensaladas');
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