import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../publicacion.service';

@Component({
  selector: 'app-desayuno',
  templateUrl: './desayuno.page.html',
  styleUrls: ['./desayuno.page.scss'],
})
export class DesayunoPage implements OnInit {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit() {
    this.cargarPublicacionesPorCategoria('Desayuno');
  }

  cargarPublicacionesPorCategoria(categoria: string) {
    this.publicacionService.getPublicacionesPorCategoria(categoria).subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Log para verificar los datos
        this.publicaciones = data;
      },
      (error) => {
        console.error('Error al cargar publicaciones:', error);
      }
    );
  }

  // Función para truncar texto
  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}