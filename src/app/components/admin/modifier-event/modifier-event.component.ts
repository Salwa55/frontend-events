import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../../services/alleventservice';
import { UserService } from '../../../services/userservice';
import { Evenement } from '../../../models/allevents';
import { User } from '../../../models/Users';
import { Router } from '@angular/router';
import { NotifService } from '../../../services/notifservice';
import { Notification } from '../../../models/notification';



@Component({
  selector: 'app-modifier-event',
  templateUrl: './modifier-event.component.html',
  styleUrls: ['./modifier-event.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModifierEventComponent implements OnInit {
  isLoading = signal<boolean>(false);
  evenement!: Evenement;
  responsables: User[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private userService: UserService,
    private router: Router,
    private notifService: NotifService
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    const idEvenement = Number(this.route.snapshot.paramMap.get('idEvenement'));

    if (!idEvenement) {
      this.errorMessage = 'ID d\'événement invalide';
      return;
    }

    // Récupération de l'événement
    this.evenementService.getEvenementByIdWithResponsable(idEvenement).subscribe({
      next: (data) => {
        this.evenement = data;
        this.isLoading.set(false);
        console.log('Événement récupéré:', this.evenement);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération de l\'événement';
        this.isLoading.set(false);
        console.error('Erreur:', error);
      }
    });

    // Récupération des responsables
    this.userService.getResponsables().subscribe({
      next: (responsables) => {
        this.responsables = responsables;
        console.log('Responsables récupérés:', this.responsables);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des responsables';
        console.error('Erreur:', error);
      }
    });
  }

  onModifierEvenement(): void {
    if (!this.evenement || !this.evenement.idEvenement) {
      this.errorMessage = 'Les données de l\'événement sont invalides.';
      return;
    }

    this.isLoading.set(true);

    // Appel au service pour mettre à jour l'événement
    this.evenementService.updateEvenementFields(this.evenement.idEvenement, this.evenement).subscribe({
      next: (updatedEvent) => {
        console.log('Événement mis à jour avec succès:', updatedEvent);
        alert('Événement modifié avec succès !');
        this.isLoading.set(false);
        this.router.navigate(['/listeEvents']);

        // Créer une notification pour l'acceptation
        const notification: Notification = {
          idUser: this.evenement.responsable as number,
          titre: 'Mise à jour de l\'événement',
          message: `L'événement "${this.evenement.titre}"a été modifié. Consultez les nouveaux détails pour rester informé.`,
          dejavue: false
        };

        this.createNotification(notification);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour de l\'événement.';
        console.error('Erreur:', error);
        this.isLoading.set(false);
      },
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
