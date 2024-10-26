import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClRecetas } from './model/ClRecetas'; // Asegúrate de que esta sea la ruta correcta al modelo

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  //private apiUrl = 'http://localhost:3000/recetas'; // Reemplaza con la URL real de la API
  //private apiUrl = 'http://192.168.100.47:3000/recetas'; // IPV Benjamin
  private apiUrl = 'http://192.168.1.119:3000/recetas';

  constructor(private http: HttpClient) {}

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código del error: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Obtener todas las recetas
  getAllRecetas(): Observable<ClRecetas[]> {
    return this.http.get<ClRecetas[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener una receta por ID (cambia `id` a string)
  getRecetaById(id: string): Observable<ClRecetas> {
    return this.http.get<ClRecetas>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Agregar una nueva receta
  addReceta(receta: ClRecetas): Observable<ClRecetas> {
    return this.http.post<ClRecetas>(this.apiUrl, receta)
      .pipe(catchError(this.handleError));
  }

  // Actualizar una receta existente (cambia `id` a string)
  updateReceta(id: string, receta: ClRecetas): Observable<ClRecetas> {
    return this.http.put<ClRecetas>(`${this.apiUrl}/${id}`, receta)
      .pipe(catchError(this.handleError));
  }

  // Eliminar una receta (cambia `id` a string)
  deleteReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Método para enviar una receta a la API
  sendRecetaToAPI(receta: ClRecetas): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl, receta, { headers })
      .pipe(catchError(this.handleError));
  }
}