import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Evenement } from '../models/allevents';
import { UserService } from './userservice';


@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'http://localhost:8087/api/evene';

  constructor(private http: HttpClient, private userService: UserService) {}

  getAllEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl).pipe(
      tap((evenements) => console.log('Événements récupérés:', evenements)),
      catchError(this.handleError)
    );
  }

  getEventCount(): Observable<number> {
    return this.getAllEvenements().pipe(
      map((evenements) => evenements.length), // Compter les événements
      tap((count) => console.log('Nombre total d\'événements:', count))
    );
  }


  getAllEvenementsWithResponsables(): Observable<Evenement[]> {
    return this.getAllEvenements().pipe(
      switchMap((evenements: Evenement[]) => {
        const userRequests = evenements.map(evenement =>
          this.userService.getUserByIdMap(Number(evenement.responsable)).pipe(
            map(user => ({
              ...evenement,
              responsableNomComplet: `${user.username} ${user.lastname}`
            }))
          )
        );
        return forkJoin(userRequests);
      }),
      catchError(this.handleError)
    );
  }

  getEvenementByIdWithResponsable(id: number): Observable<Evenement> {
    return this.getEvenementById(id).pipe(
      switchMap(evenement =>
        this.userService.getUserByIdMap(Number(evenement.responsable)).pipe(
          map(user => ({
            ...evenement,
            responsableNomComplet: `${user.username} ${user.lastname}`
          }))
        )
      ),
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

  updateState(id: number): Observable<Evenement> {
    const url = `${this.apiUrl}/state/${id}`;
    return this.http.put<Evenement>(url, null).pipe(
      tap((evenement) => console.log('État de l\'événement mis à jour:', evenement)),
      catchError(this.handleError)
    );
  }

  updateDecisionAndCauseRefus(id: number, decision: string, causeRefus?: string): Observable<Evenement> {
    const url = `${this.apiUrl}/decision/${id}`;
    const params: any = { decision };
    if (causeRefus) {
      params.causeRefus = causeRefus;
    }

    return this.http.put<Evenement>(url, null, { params }).pipe(
      tap((evenement) => console.log('Décision mise à jour:', evenement)),
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

  deleteEvenement(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log(`Événement avec ID ${id} supprimé`)),
      catchError(this.handleError)
    );
  }

  updateEvenementFields(id: number, updatedFields: Partial<Evenement>): Observable<Evenement> {
    const url = `${this.apiUrl}/update-fields/${id}`;
    return this.http.put<Evenement>(url, updatedFields).pipe(
      tap((evenement) => console.log('Événement mis à jour partiellement:', evenement)),
      catchError(this.handleError)
    );
  }

  createEvenement(evenement: Evenement): Observable<Evenement> {
    const url = `${this.apiUrl}`;
    return this.http.post<Evenement>(url, evenement).pipe(
      tap((newEvenement) => console.log('Événement créé avec succès:', newEvenement)),
      catchError(this.handleError)
    );
  }



}
