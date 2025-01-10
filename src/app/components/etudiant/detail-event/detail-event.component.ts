import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../../services/alleventservice'; // Adjust the import path as needed
import { Evenement } from '../../../models/allevents'; // Adjust the import path as needed

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
  evenement: Evenement | undefined;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) {}

  ngOnInit(): void {
    // Retrieve the 'idEvenement' from the route parameters
    const idEvenement = Number(this.route.snapshot.paramMap.get('idEvenement'));

    if (!idEvenement) {
      this.errorMessage = 'ID d\'événement invalide';
      return;
    }

    // Fetch the event details using the service
    this.evenementService.getEvenementById(idEvenement).subscribe({
      next: (evenement) => {
        this.evenement = evenement;
      },
      error: (err) => {
        this.errorMessage = `Erreur lors de la récupération de l'événement: ${err.message}`;
      }
    });
  }
}
