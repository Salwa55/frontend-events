import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvenementService } from '../../../services/alleventservice';
import { Evenement } from '../../../models/allevents';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-accueil-visiteur',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './accueil-visiteur.component.html',
  styleUrls: ['./accueil-visiteur.component.css']
})
export class AccueilVisiteurComponent {
  private evenementService = inject(EvenementService);
  
  isLoading = signal<boolean>(false);
  evenements: Evenement[] = [];

  constructor() {
    this.loadEvenements();
  }

  private loadEvenements(): void {
    this.isLoading.set(true);
    this.evenementService.getAllEvenements().subscribe({
      next: (evenements) => {
        console.log('Événements reçus:', evenements); // Pour déboguer
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
}
