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
  styleUrl: './notifications-respo.component.css'
})
export class NotificationsRespoComponent implements OnInit {
  notifications: Notification[] = [];
  constructor(private notifservice:NotifService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifservice.getAllNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error loading notifications:', error);
      }
    );
  }
}

