import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../../services/alleventservice';
import { UserService } from '../../../services/userservice';
import { ParticipationService } from '../../../services/participationservice';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  eventCount: number = 0;
  usersCount: number = 0;
  resposCount: number = 0;
  participationCount: number = 0;

  constructor(
    private evenementService: EvenementService,
    private userService: UserService,
    private participationService: ParticipationService
    ) {}

  ngOnInit(): void {
    // Récupérer le nombre d'événements
    this.evenementService.getEventCount().subscribe({
      next: (count) => {
        this.eventCount = count; // Mettre à jour le nombre d'événements
        console.log('Nombre total d\'événements:', this.eventCount);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    });

    // Récupérer le nombre des users
    this.userService.getUsersCount().subscribe({
      next: (count) => {
        this.usersCount = count;
        console.log('Nombre total des utilisateurs:', this.usersCount);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    });

    // Récupérer le nombre des respos
    this.userService.getRespoCount().subscribe({
      next: (count) => {
        this.resposCount = count;
        console.log('Nombre total des utilisateurs:', this.resposCount);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des respos:', error);
      }
    });

    // Récupérer le nombre des participations
    this.participationService.getParticipationCount().subscribe({
      next: (count) => {
        this.participationCount = count;
        console.log('Nombre total des participations:', this.participationCount);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des participations:', error);
      }
    });
  }
}
