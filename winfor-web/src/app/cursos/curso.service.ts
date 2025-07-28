import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  // TODO tornar configurável
  private apiUrl = 'http://localhost:8080/api/cursos/';

  constructor(private httpClient: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.apiUrl)
      .pipe(catchError(this.handleRetrievalError));
  }

  private handleRetrievalError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("Curso não encontrado"));
    } else {
      console.error(`Erro na leitura do curso: ${error.error}`);
      return throwError(() => new Error("Ocorreu um erro. Por favor, tente novamente"));
    }
  }
}
