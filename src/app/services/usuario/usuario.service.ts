import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Usuario {
  id?: number;
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

  //registrar usuario enviando los datos a la API
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

//autenticar al usuario
  autenticarUsuario(nombre: string, password: string): Observable<Usuario | null> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('password', password);

    return this.http.get<Usuario[]>(this.apiUrl, { params }).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error en el servicio:', error);
    return throwError(() => new Error('Error en la comunicación con el servidor'));
  }
}