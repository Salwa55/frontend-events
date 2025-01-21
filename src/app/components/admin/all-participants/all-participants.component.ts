import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticipationService, Participation } from '../../../services/participationservice';
import { EvenementService } from '../../../services/alleventservice';
import { UserService } from '../../../services/userservice';
import { NotifService } from '../../../services/notifservice';
import { Evenement } from '../../../models/allevents';
import { User } from '../../../models/Users';
import { Notification } from '../../../models/notification';


interface ParticipationDetails {
  idParticipation: number;
  evenement: Evenement;
  participant: User;
  acceptEtud: string;
}

@Component({
  selector: 'app-all-participants',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './all-participants.component.html',
  styleUrls: ['./all-participants.component.css']
})
export class AllParticipantsComponent implements OnInit {
  isLoading = signal<boolean>(false);
  participations: ParticipationDetails[] = [];
  errorMessage: string = '';

  constructor(
    private participationService: ParticipationService,
    private evenementService: EvenementService,
    private userService: UserService,
    private notifService: NotifService
  ) {}

  ngOnInit(): void {
    this.loadParticipations();
  }

  loadParticipations(): void {
    this.isLoading.set(true);
    this.participationService.getParticipationsEnAttente().subscribe({
      next: (participations) => {
        // Réinitialiser le tableau des participations
        this.participations = [];
        // Charger les détails pour chaque participation
        participations.forEach(participation => {
          Promise.all([
            this.loadEvenementDetails(participation.idEvenement),
            this.loadUserDetails(participation.idUser)
          ]).then(([evenement, user]) => {
            this.participations.push({
              idParticipation: participation.idParticipation, // Ajout de l'ID
              evenement,
              participant: user,
              acceptEtud: participation.acceptEtud
            });
          }).catch(error => {
            console.error('Erreur lors du chargement des détails:', error);
          });
        });
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des participations';
        console.error('Erreur:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  private loadEvenementDetails(idEvenement: number): Promise<Evenement> {
    return new Promise((resolve, reject) => {
      this.evenementService.getEvenementById(idEvenement).subscribe({
        next: (evenement) => resolve(evenement),
        error: (error) => reject(error)
      });
    });
  }

  private loadUserDetails(idUser: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(idUser).subscribe({
        next: (user) => resolve(user),
        error: (error) => reject(error)
      });
    });
  }

  onConfirmAction(action: 'accepter' | 'refuser', idParticipation: number): void {
    const message =
      action === 'accepter'
        ? 'Êtes-vous sûr de vouloir accepter cette participation ?'
        : 'Êtes-vous sûr de vouloir refuser cette participation ?';

    const confirmation = window.confirm(message);

    if (!confirmation) return; // Annuler l'action si l'utilisateur refuse

    if (action === 'accepter') {
      this.accepterParticipation(idParticipation);
    } else if (action === 'refuser') {
      this.refuserParticipation(idParticipation);
    }
  }


  accepterParticipation(idParticipation: number): void {
    this.isLoading.set(true);

    const participation = this.participations.find(p => p.idParticipation === idParticipation);

    if (!participation) {
      alert('Participation introuvable.');
      this.isLoading.set(false);
      return;
    }

    // Vérifier si l'ID utilisateur est défini
    if (!participation.participant.id) {
      console.error('Erreur : ID utilisateur manquant.');
      this.isLoading.set(false);
      return;
    }

    this.participationService.accepterParticipation(idParticipation).subscribe({
      next: () => {
        // Supprimer la participation de la liste
        this.participations = this.participations.filter(
          (p) => p.idParticipation !== idParticipation
        );
        alert('Participation acceptée avec succès.');

        // Créer une notification pour l'acceptation
        const notification: Notification = {
          idUser: participation.participant.id,
          titre: 'Participation confirmée !',
          message: `Vous êtes maintenant inscrit à l'événement "${participation.evenement.titre}". Consultez vos participations pour plus de détails !`,
          dejavue: false
        };

        this.createNotification(notification);
      },
      error: (error) => {
        console.error('Erreur lors de l\'acceptation de la participation:', error);
        alert('Une erreur est survenue lors de l\'acceptation.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  refuserParticipation(idParticipation: number): void {
    this.isLoading.set(true);

    const participation = this.participations.find(p => p.idParticipation === idParticipation);
    if (!participation) {
      alert('Participation introuvable.');
      this.isLoading.set(false);
      return;
    }

    // Vérifier si l'ID utilisateur est défini
    if (!participation.participant.id) {
      console.error('Erreur : ID utilisateur manquant.');
      this.isLoading.set(false);
      return;
    }

    this.participationService.refuserParticipation(idParticipation).subscribe({
      next: () => {
        // Supprimer la participation de la liste
        this.participations = this.participations.filter(
          (p) => p.idParticipation !== idParticipation
        );
        alert('Participation refusée avec succès.');

        // Créer une notification pour l'acceptation
        const notification: Notification = {
          idUser: participation.participant.id,
          titre: 'Participation annulée !',
          message: `Votre participation a été annulée à l'événement "${participation.evenement.titre}". Nous espérons vous revoir dans d'autres événements !`,
          dejavue: false
        };

        this.createNotification(notification);
      },
      error: (error) => {
        console.error('Erreur lors du refus de la participation:', error);
        alert('Une erreur est survenue lors du refus.');
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
