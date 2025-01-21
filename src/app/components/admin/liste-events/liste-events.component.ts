import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvenementService } from '../../../services/alleventservice';
import { Evenement } from '../../../models/allevents';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-events',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './liste-events.component.html',
  styleUrls: ['./liste-events.component.css']
})
export class ListeEventsComponent {
  private evenementService = inject(EvenementService);

  isLoading = signal<boolean>(false);
  evenements: Evenement[] = [];

  constructor() {
    this.loadEvenements();
  }

  private loadEvenements(): void {
    this.isLoading.set(true);
    this.evenementService.getAllEvenementsWithResponsables().subscribe({
      next: (evenements) => {
        console.log('Événements enrichis avec responsables:', evenements);
        this.evenements = evenements;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements:', error);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  confirmDelete(idEvenement: number | undefined): void {
    if (idEvenement === undefined) {
      alert('Impossible de supprimer : ID de l\'événement introuvable.');
      return;
    }
  
    const confirm = window.confirm(
      'Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.'
    );
  
    if (confirm) {
      this.isLoading.set(true);
      this.evenementService.deleteEvenement(idEvenement).subscribe({
        next: () => {
          this.evenements = this.evenements.filter(
            (evenement) => evenement.idEvenement !== idEvenement
          );
          alert('Événement supprimé avec succès.');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Erreur lors de la suppression de l\'événement.');
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }
  
}
