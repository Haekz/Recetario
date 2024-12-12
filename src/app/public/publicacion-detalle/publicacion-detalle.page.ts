import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from '../publicacion.service';

@Component({
  selector: 'app-publicacion-detalle',
  templateUrl: './publicacion-detalle.page.html',
  styleUrls: ['./publicacion-detalle.page.scss'],
})
export class PublicacionDetallePage implements OnInit {
  publicacion: any;

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarPublicacion(id);
  }

  cargarPublicacion(id: string | null) {
    this.publicacionService.getPublicaciones().subscribe({
      next: (data) => {
        this.publicacion = data.find(pub => pub.id === id);
      },
      error: (err) => {
        console.error('Error al cargar la publicación', err);
      },
    });
  }
}