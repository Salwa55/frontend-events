import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationService } from '../../../services/participationservice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-events-etudiant',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './events-etudiant.component.html',
  providers: [ParticipationService]
})
export class EventsEtudiantComponent implements OnInit {
  isLoading = signal<boolean>(false);
  participations: any[] = [];
  error: string | null = null;

  constructor(private participationService: ParticipationService) {}

  ngOnInit() {
    this.loadParticipations();
  }

  loadParticipations() {
    this.isLoading.set(true);
    const userId = localStorage.getItem('idUser');

    if (!userId) {
      this.error = "ID utilisateur non trouvé dans le localStorage";
      this.isLoading.set(false);
      return;
    }

    this.participationService.getParticipationsByUserId(Number(userId)).subscribe({
      next: (data) => {
        console.log('Participations reçues:', data);
        this.participations = data;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = err.message;
        this.isLoading.set(false);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'ACCEPTE': return 'text-success';
      case 'REFUSE': return 'text-danger';
      default: return 'text-warning';
    }
  }
}