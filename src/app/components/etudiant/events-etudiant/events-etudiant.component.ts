import { Component, OnInit, inject, signal } from '@angular/core';
import { ParticipationService, Participation } from '../../../services/participationservice';
import { EvenementService } from '../../../services/alleventservice'; // Import du service des événements
import { CommonModule } from '@angular/common';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-events-etudiant',
  templateUrl: './events-etudiant.component.html',
  styleUrls: ['./events-etudiant.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class EventsEtudiantComponent implements OnInit {
  participations: (Participation & { titreEvenement?: string })[] = [];
  errorMessage: string = '';
  userId: number | null = null;

  constructor(
    private participationService: ParticipationService,
    private evenementService: EvenementService // Service pour récupérer les détails des événements
  ) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();

    if (this.userId !== null) {
      this.participationService.getParticipationsByUserId(this.userId).subscribe({
        next: (participations) => {
          this.fetchEventTitles(participations);
        },
        error: (err) => {
          this.errorMessage = `Erreur lors de la récupération des participations: ${err.message}`;
        },
      });
    } else {
      this.errorMessage = 'Utilisateur non connecté.';
    }
  }

  // Récupérer l'ID de l'utilisateur depuis localStorage
  getUserIdFromLocalStorage(): number | null {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }

  // Associer les titres des événements aux participations
  fetchEventTitles(participations: Participation[]): void {
    const fetches = participations.map((participation) =>
      this.evenementService.getEvenementById(participation.idEvenement).pipe(
        map((evenement) => ({
          ...participation,
          titreEvenement: evenement.titre,
        }))
      )
    );

    forkJoin(fetches).subscribe({
      next: (results) => {
        this.participations = results;
      },
      error: (err) => {
        this.errorMessage = `Erreur lors de la récupération des événements: ${err.message}`;
      },
    });
  }
}
