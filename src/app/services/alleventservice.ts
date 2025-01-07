import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Evenement } from '../models/allevents';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'http://localhost:8087/api/evene'; // URL de votre API

  constructor(private http: HttpClient) {}

  getAllEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl).pipe(
      tap((evenements) => console.log('Événements récupérés:', evenements)),
      catchError(this.handleError)
    );
  }
  getEvenementsResponsable(): Observable<Evenement[]> {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      return throwError(() => new Error('Aucun ID utilisateur trouvé'));
    }

    const url = `${this.apiUrl}/resp/${userId}`;
    
    return this.http.get<Evenement[]>(url).pipe(
      tap((evenements) => console.log('Événements du responsable récupérés:', evenements)),
      catchError(this.handleError)
    );
  }
  getEvenementById(id: number): Observable<Evenement> {
    const url = `${this.apiUrl}/${id}`;  // URL to fetch the event by ID
    return this.http.get<Evenement>(url).pipe(
      tap((evenement) => console.log('Événement récupéré:', evenement)),
      catchError(this.handleError)
    );
  }

  updateState(id: number, state: boolean): Observable<Evenement> {
    const url = `${this.apiUrl}/state/${id}`;  // URL to update the event state by ID
    return this.http.put<Evenement>(url, null, { params: { state: state.toString() } }).pipe(
      tap((evenement) => console.log('État de l\'événement mis à jour:', evenement)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
