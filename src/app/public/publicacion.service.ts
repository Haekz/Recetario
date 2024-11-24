import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://192.168.1.119:3000/publicacion';

  constructor(private http: HttpClient) {}

  // Obtener todas las publicaciones
  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener publicaciones por categoría
  getPublicacionesPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?categoría=${categoria}`);
  }
}
