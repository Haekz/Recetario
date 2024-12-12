import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://192.168.1.119:3000/publicacion';
  private favoritos: any[] = [];

  constructor(private http: HttpClient) {}

  // Obtener todas las publicaciones
  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener publicaciones por categoría
  getPublicacionesPorCategoria(categoria: string): Observable<any[]> {
    const encodedCategoria = encodeURIComponent(categoria);
    return this.http.get<any[]>(`${this.apiUrl}?categoría=${encodedCategoria}`);
  }

  // Agregar publicación a favoritos
  agregarAFavoritos(publicacion: any) {
    if (!this.favoritos.some(fav => fav.id === publicacion.id)) {
      this.favoritos.push(publicacion);
      console.log('Añadido a favoritos:', publicacion);
    }
  }

  eliminarDeFavoritos(id: string) {
    this.favoritos = this.favoritos.filter(fav => fav.id !== id);
    console.log('Eliminado de favoritos, ID:', id);
  }

  // Obtener publicaciones favoritas
  getFavoritos(): any[] {
    return this.favoritos;
  }
}
