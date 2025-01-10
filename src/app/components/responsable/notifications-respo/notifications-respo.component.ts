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
  styleUrls: ['./notifications-respo.component.css'] // Corrigé (pluriel)
})
export class NotificationsRespoComponent implements OnInit {
  notifications: Notification[] = [];
  userId: number = 0; // Initialisation de l'idUser

  constructor(private notifservice: NotifService) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadNotifications();
  }

  loadUserId(): void {
    // Récupérer l'idUser depuis le localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = parseInt(userId, 10); // Convertir en nombre
    }
  }

  loadNotifications(): void {
    if (this.userId > 0) {
      this.notifservice.getNotificationsByUserId(this.userId).subscribe(
        (data) => {
          this.notifications = data;
        },
        (error) => {
          console.error('Error loading notifications:', error);
        }
      );
    } else {
      console.error('idUser not found in localStorage.');
    }
  }
}
