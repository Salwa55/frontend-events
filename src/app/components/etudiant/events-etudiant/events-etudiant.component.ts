import { Component, OnInit , inject, signal} from '@angular/core';
import { ParticipationService, Participation } from '../../../services/participationservice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-events-etudiant',
  templateUrl: './events-etudiant.component.html',
  styleUrls: ['./events-etudiant.component.css']
})
export class EventsEtudiantComponent implements OnInit {
  participations: Participation[] = [];
  errorMessage: string = '';
  userId: number | null = null; // userId peut être null si non trouvé dans localStorage

  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
    
    if (this.userId !== null) {
      this.loadParticipations();
    } else {
      this.errorMessage = 'L\'ID de l\'étudiant n\'est pas disponible.';
    }
  }

  // Récupérer l'ID de l'utilisateur depuis localStorage
  getUserIdFromLocalStorage(): number | null {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }

  // Charger toutes les participations de l'étudiant
  loadParticipations(): void {
    if (this.userId !== null) {
      this.participationService.getParticipationsByUserId(this.userId).subscribe({
        next: (data) => {
          this.participations = data;
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  // Ajouter une nouvelle participation
  addParticipation(): void {
    if (this.userId !== null) {
      const newParticipation = {
        idEvenement: 1, // ID de l'événement auquel l'étudiant souhaite participer
        idUser: this.userId,
        acceptEtud: 'oui' // Ou 'non' selon l'acceptation
      };

      this.participationService.createParticipation(newParticipation).subscribe({
        next: (data) => {
          this.participations.push(data); // Ajouter la nouvelle participation à la liste
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  // Supprimer une participation
  deleteParticipation(id: number): void {
    if (this.userId !== null) {
      this.participationService.deleteParticipation(id).subscribe({
        next: () => {
          this.participations = this.participations.filter(p => p.idEvenement !== id); // Supprimer de la liste
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }
}
