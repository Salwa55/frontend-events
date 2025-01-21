import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { NotifService } from '../../../services/notifservice';
import { Notification } from '../../../models/notification';

@Component({
  selector: 'app-notifications-respo',
  imports: [
    MatCardModule,
    MatIconModule,
    NgFor
  ],
  templateUrl: './notifications-respo.component.html',
  styleUrls: ['./notifications-respo.component.css'] 
})
export class NotificationsRespoComponent implements OnInit {
  notifications: Notification[] = [];
  userId: number | null = null;

  constructor(private notifservice: NotifService) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();

    if (this.userId) {
      this.loadUserNotifications(this.userId);
    }
  }

  // Récupérer l'ID de l'utilisateur depuis localStorage
  getUserIdFromLocalStorage(): number | null {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }

    // Charger les notifications de l'utilisateur
  loadUserNotifications(idUser: number): void {
    this.notifservice.getNotificationsByUserId(idUser).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des notifications :', err);
      },
    });
  }
}
