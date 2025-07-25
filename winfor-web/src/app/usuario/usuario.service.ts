import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // TODO tornar configurável
  private apiUrl = 'http://localhost:8080/api/usuario/';

  constructor(private httpClient: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleRetrievalError));
  }

  addUsuario(username: string): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.apiUrl}/`, username)
      .pipe(catchError(this.handleCreationError));
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  private handleCreationError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error("Falha de conexão. Por favor, tente novamente"));
    } else if (error.status === HttpStatusCode.Conflict) {
      return throwError(() => new Error("Já existe um usuário com o login informado"));
    } else {
      console.error(`Erro na criação do usuário: ${error.error}`);
      return throwError(() => new Error("Ocorreu um erro na criação do usuário"));
    }
  }

  private handleRetrievalError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("Usuário não encontrado"));
    } else {
      console.error(`Erro na leitura do usuário: ${error.error}`);
      return throwError(() => new Error("Ocorreu um erro. Por favor, tente novamente"));
    }
  }
}
