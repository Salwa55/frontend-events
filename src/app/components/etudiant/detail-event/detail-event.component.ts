import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../../services/alleventservice';
import { ParticipationService, ParticipationDTO } from '../../../services/participationservice';
import { Evenement } from '../../../models/allevents';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  imports: [CommonModule],
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
  evenement!: Evenement;
  errorMessage: string = '';
  userId: number | null = null; // Remplacez par la logique pour récupérer l'ID de l'utilisateur connecté

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private participationService: ParticipationService
  ) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
    const idEvenement = Number(this.route.snapshot.paramMap.get('idEvenement'));

    if (!idEvenement) {
      this.errorMessage = 'ID d\'événement invalide';
      return;
    }

  
    this.evenementService.getEvenementById(idEvenement).subscribe({
      next: (evenement) => {
        this.evenement = evenement;
      },
      error: (err) => {
        this.errorMessage = `Erreur lors de la récupération de l'événement: ${err.message}`;
      }
    });
  }

  // Récupérer l'ID de l'utilisateur depuis localStorage
  getUserIdFromLocalStorage(): number | null {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }


  reservePlace(): void {
    if (this.userId && this.evenement) {
      const participation: ParticipationDTO = {
        idEvenement: this.evenement.idEvenement!,
        idUser: this.userId,
        acceptEtud: 'en attente' // Valeur initiale par défaut
      };

      this.participationService.createParticipation(participation).subscribe({
        next: (): void => {
          alert('Votre réservation a été enregistrée avec succès !');
        },
        error: (err: any): void => {
          this.errorMessage = `Erreur lors de la réservation : ${err.message}`;
        }
      });
    } else {
      this.errorMessage = 'Impossible de réserver. Vérifiez les informations utilisateur ou événement.';
    }
  }
}
