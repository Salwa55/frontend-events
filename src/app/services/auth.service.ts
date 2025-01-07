import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8087/api/users'; // URL du backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer l'utilisateur par email
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }
}
