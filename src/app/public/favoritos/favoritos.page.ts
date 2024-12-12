import { Component } from '@angular/core';
import { PublicacionService } from '../publicacion.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  favoritos: any[] = [];

  constructor(private publicacionService: PublicacionService) {}

  ionViewWillEnter() {
    this.favoritos = this.publicacionService.getFavoritos();
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}