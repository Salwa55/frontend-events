import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvenementService } from '../../../services/alleventservice';
import { UserService } from '../../../services/userservice';
import { Evenement } from '../../../models/allevents';
import { User } from '../../../models/Users';
import { Router } from '@angular/router';
import { NotifService } from '../../../services/notifservice';
import { Notification } from '../../../models/notification';



@Component({
  selector: 'app-ajouter-event',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './ajouter-event.component.html',
  styleUrl: './ajouter-event.component.css'
})
export class AjouterEventComponent implements OnInit {
  isLoading = signal<boolean>(false);
  responsables: User[] = [];
  errorMessage: string = '';

  // Objet événement pour le formulaire
  evenement: Partial<Evenement> = {
    titre: '',
    description: '',
    lieu: '',
    nbrParticipant: 0,
    dateDebut: undefined,
    dateFin: undefined,
    responsable: 0,
    role: '',
    decision: 'en attente',
    causeRefus: ''
  };

  constructor(
    private evenementService: EvenementService,
    private userService: UserService,
    private router: Router,
    private notifService: NotifService
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);

    // Récupération des responsables
    this.userService.getResponsables().subscribe({
      next: (responsables) => {
        this.responsables = responsables;
        console.log('Responsables récupérés:', this.responsables);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des responsables';
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  // Méthode pour créer un événement
  onSubmit(): void {
    this.isLoading.set(true);
    this.evenementService.createEvenement(this.evenement as Evenement).subscribe({
      next: (result) => {
        console.log('Événement créé avec succès:', result);
        this.router.navigate(['/listeEvents']);

        // Créer une notification pour l'acceptation
        const notification: Notification = {
          idUser: this.evenement.responsable as number,
          titre: 'Nouvelle Participation à Valider',
          message: `Vous êtes maintenant affectés à l'événement "${this.evenement.titre}". Veuillez valider cette participation dans la section dédiée.`,
          dejavue: false
        };

        this.createNotification(notification);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création de l\'événement';
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  private createNotification(notification: Notification): void {
    this.notifService.createNotification(notification).subscribe({
      next: () => {
        console.log('Notification créée avec succès.');
      },
      error: (error) => {
        console.error('Erreur lors de la création de la notification:', error);
      }
    });
  }
}
