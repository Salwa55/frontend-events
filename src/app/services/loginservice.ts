import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/login'; // Assurez-vous que le chemin est correct.

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8087/api/users'; // Remplacez par l'URL de votre backend.

  constructor(private http: HttpClient) {}

  /**
   * Authentifier un utilisateur.
   * @param email L'email de l'utilisateur.
   * @param password Le mot de passe de l'utilisateur.
   * @returns Un Observable contenant la réponse de l'API.
   */
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(url, body, { headers });
  }

  /**
   * Récupérer un utilisateur par son ID.
   * @param id L'ID de l'utilisateur.
   * @returns Un Observable contenant les détails de l'utilisateur.
   */
  getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  /**
   * Créer un nouvel utilisateur.
   * @param user Les informations de l'utilisateur.
   * @returns Un Observable contenant la réponse de l'API.
   */
  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.baseUrl, user, { headers });
  }
}
