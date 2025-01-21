import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../../services/alleventservice';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CauseRefusComponent} from '../cause-refus/cause-refus.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-details-eventrespo',
  imports: [
    NgIf
  ],
  templateUrl: './details-eventrespo.component.html',
  styleUrl: './details-eventrespo.component.css'
})
export class DetailsEventrespoComponent implements OnInit {
  idEvenement: number | null = null;
  decision: string | null = null;
  eventDetails: any = {};
  constructor(private evenementService: EvenementService,private dialog:MatDialog,private route : ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idEvenement');
    this.idEvenement = id !== null ? Number(id) : null;
    this.loadEventDetails();
  }

  loadEventDetails(): void {
    if(this.idEvenement !== null) {
      this.evenementService.getEvenementById(this.idEvenement).subscribe(
        (data) => {
          console.log('Event details loaded:', data);
          this.eventDetails = data;
          this.decision = this.eventDetails.decision;
        },
        (error) => {
          console.error('Error loading event details:', error);
        }
      );
    }
  }

  openRefus() {
    if (this.idEvenement !== null) {
      this.dialog.open(CauseRefusComponent, {
        width: '1000px',
        data: { idEvenement: this.idEvenement } // Transmet l'idEvenement
      });
    } else {
      console.error('ID de l\'événement non défini');
    }
  }


  acceptEvent(): void {
    if (this.idEvenement !== null) {
      this.evenementService.updateState(this.idEvenement).subscribe(
        (updatedEvent) => {
          console.log('État de l\'événement mis à jour avec succès:', updatedEvent);
          this.eventDetails = updatedEvent; // Met à jour les détails de l'événement localement
          this.decision = updatedEvent.decision; // Met à jour la décision localement si nécessaire
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'état:', error);
          // Ajoutez ici un message pour notifier l'utilisateur en cas d'erreur
        }
      );
    } else {
      console.error('ID de l\'événement non défini');
    }
  }

}
