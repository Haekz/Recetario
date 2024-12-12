import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from '../publicacion.service';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';


@Component({
  selector: 'app-publicacion-detalle',
  templateUrl: './publicacion-detalle.page.html',
  styleUrls: ['./publicacion-detalle.page.scss'],
})
export class PublicacionDetallePage implements OnInit {
  publicacion: any;

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionService,
    private sanitizer: DomSanitizer
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

  sanitizarURL(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }
}