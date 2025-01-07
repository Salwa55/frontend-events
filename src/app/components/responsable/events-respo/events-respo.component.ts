import { Component, OnInit } from '@angular/core';
import { CommonModule,NgIf, NgFor } from '@angular/common';
import { EvenementService } from '../../../services/alleventservice';
import { Evenement } from '../../../models/allevents';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import{RouterLink} from '@angular/router';

@Component({
  selector: 'app-events-respo',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './events-respo.component.html',
  styleUrls: ['./events-respo.component.css']
})
export class EventsRespoComponent implements OnInit {
  evenements: Evenement[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  displayedColumns: string[] = ['index', 'titre', 'description', 'dateFin', 'responsable', 'action'];

  constructor(private evenementService: EvenementService) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.isLoading = true;
    this.evenementService.getEvenementsResponsable().subscribe({
      next: (data) => {
        this.evenements = data;
        this.isLoading = false;
        console.log('Événements chargés:', this.evenements);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des événements';
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }
}