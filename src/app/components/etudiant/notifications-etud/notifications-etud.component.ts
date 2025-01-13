import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { NotifService } from '../../../services/notifservice';
import { Notification } from '../../../models/notification';


@Component({
  selector: 'app-notifications-etud',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgFor
  ],
  templateUrl: './notifications-etud.component.html',
  styleUrls: ['./notifications-etud.component.css'],
})

export class NotificationsEtudComponent implements OnInit{
  notifications: Notification[] = [];
  userId: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
  }

  // Récupérer l'ID de l'utilisateur depuis localStorage
  getUserIdFromLocalStorage(): number | null {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }

 
}
