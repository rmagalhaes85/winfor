import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatrizCurricular } from './matriz-curricular';
import { MatrizDisciplina } from './matriz-disciplina';

@Injectable({
  providedIn: 'root'
})
export class MatrizCurricularService {
  // TODO tornar configurável
  private apiMatrizUrl = 'http://localhost:8080/api/matrizes';
  private apiMatrizDisciplinaUrl = 'http://localhost:8080/api/matriz_disciplinas';

  constructor(private httpClient: HttpClient) { }

  getMatrizCurricular(cursoId: number) {
    return this.httpClient.get<MatrizCurricular>(`${this.apiMatrizUrl}/cursoid/${cursoId}`)
      .pipe(catchError(this.handleRetrievalError));
  }

  getMatrizDisciplinas(matrizId: number) {
    return this.httpClient.get<MatrizDisciplina[]>(
      `${this.apiMatrizDisciplinaUrl}/search/${matrizId}`
    ).pipe(catchError(this.handleRetrievalError));
  }

  private handleRetrievalError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.NotFound) {
      return throwError(() => new Error("Matriz não encontrada"));
    } else {
      console.error(`Erro na leitura da matriz: ${error.error}`);
      return throwError(() => new Error("Ocorreu um erro. Por favor, tente novamente"));
    }
  }

}
