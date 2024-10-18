import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CLRecetas } from './model/ClReceta'; // Asegúrate de que esta sea la ruta correcta al modelo

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  //private apiUrl = 'http://localhost:3000/recetas'; // Reemplaza con la URL real de la API
  private apiUrl = 'http://192.168.1.119:3000/recetas';
  //private apiUrl = 'http://192.168.1.119:3000/recetas';

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
  getAllRecetas(): Observable<CLRecetas[]> {
    return this.http.get<CLRecetas[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener una receta por ID
  getRecetaById(id: string): Observable<CLRecetas> {
    return this.http.get<CLRecetas>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Agregar una nueva receta
  addReceta(receta: CLRecetas): Observable<CLRecetas> {
    return this.http.post<CLRecetas>(this.apiUrl, receta).pipe(catchError(this.handleError));
  }

  // Método en RecetaService para actualizar una receta existente
  updateReceta(id: string, receta: CLRecetas): Observable<CLRecetas> {
    return this.http.put<CLRecetas>(`${this.apiUrl}/${id}`, receta)
      .pipe(catchError(this.handleError));
}

  // Eliminar una receta
  deleteReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Método para enviar una receta a la API
  sendRecetaToAPI(receta: CLRecetas): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl, receta, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  
}