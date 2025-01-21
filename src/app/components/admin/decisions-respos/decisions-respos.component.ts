import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvenementService } from '../../../services/alleventservice';
import { Evenement } from '../../../models/allevents';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-decisions-respos',
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './decisions-respos.component.html',
  styleUrl: './decisions-respos.component.css'
})
export class DecisionsResposComponent {
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
}