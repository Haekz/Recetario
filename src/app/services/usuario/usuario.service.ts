import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuario'; // URL de la API en puerto 3000

  constructor(private http: HttpClient) {}

  // Método para registrar usuario enviando los datos a la API
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  // Método para autenticar al usuario
  autenticarUsuario(nombre: string, password: string): Observable<Usuario | null> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('password', password);

    return this.http.get<Usuario[]>(this.apiUrl, { params }).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(this.handleError)
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario'); // Comprueba si existe un usuario en el localStorage
  }

  // Verificar si el nombre de usuario existe
  verificarExistenciaUsuario(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?nombre=${nombre}`);
  }

  // Verificar si el correo electrónico existe
  verificarExistenciaEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('usuario');
  }

  // Método para obtener el usuario por nombre
  obtenerUsuarioPorNombre(nombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?nombre=${nombre}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar la contraseña del usuario
  actualizarPassword(id: string, nuevaPassword: string): Observable<any> {
    const body = { password: nuevaPassword };
    return this.http.patch(`${this.apiUrl}/${id}`, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en el servicio:', error);
    return throwError(() => new Error('Error en la comunicación con el servidor'));
  }
}