import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
    providedIn: 'root'
})
export class NotifService {
    private apiUrl = 'http://localhost:8087/api/notif'; // URL de votre API

    constructor(private http: HttpClient) {}

    createNotification(notification: Notification): Observable<Notification> {
        return this.http.post<Notification>(this.apiUrl, notification, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    getAllNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(this.apiUrl);
    }

    getNotificationById(id: number): Observable<Notification> {
        return this.http.get<Notification>(`${this.apiUrl}/${id}`);
    }
    getNotificationsByUserId(idUser: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/user/${idUser}`);
    }

    updateNotification(id: number, notification: Notification): Observable<Notification> {
        return this.http.put<Notification>(`${this.apiUrl}/${id}`, notification, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    deleteNotification(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
