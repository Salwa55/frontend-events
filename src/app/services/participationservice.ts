import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Participation {
  idEvenement: number;
  idUser: number;
  acceptEtud: string;
}

export interface ParticipationDTO {
  idEvenement: number;
  idUser: number;
  acceptEtud: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private apiUrl = 'http://localhost:8087/api/partici';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les participations d'un étudiant
  getParticipationsByUserId(userId: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/etud/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer toutes les participations
  getAllParticipations(): Observable<Participation[]> {
    return this.http.get<Participation[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Créer une nouvelle participation
  createParticipation(participationDTO: ParticipationDTO): Observable<Participation> {
    return this.http.post<Participation>(this.apiUrl, participationDTO)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer une participation par son ID
  getParticipationById(id: number): Observable<Participation> {
    return this.http.get<Participation>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour une participation
  updateParticipation(id: number, participationDTO: ParticipationDTO): Observable<Participation> {
    return this.http.put<Participation>(`${this.apiUrl}/${id}`, participationDTO)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Supprimer une participation
  deleteParticipation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestionnaire d'erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 409:
          errorMessage = 'Conflit avec une ressource existante';
          break;
        default:
          errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
