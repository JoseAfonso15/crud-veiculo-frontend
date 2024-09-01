import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Veiculo } from './veiculo';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "https://teste-infosistemas.afonso-app.xyz/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/veiculos',this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  create(post: Veiculo): Observable<any> {
    return this.httpClient.post(this.apiURL + '/veiculos', JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/veiculos/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: Veiculo): Observable<any> {
    return this.httpClient.put(this.apiURL + '/veiculos/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiURL + '/veiculos/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro de cliente ou rede
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro retornado pela API
      errorMessage = `Código de erro: ${error.status}\nMensagem: ${error.error.message || error.message}`;
    }
    return throwError(error);
  }
}