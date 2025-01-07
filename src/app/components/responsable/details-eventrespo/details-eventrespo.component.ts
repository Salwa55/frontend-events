import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../../services/alleventservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-eventrespo',
  imports: [],
  templateUrl: './details-eventrespo.component.html',
  styleUrl: './details-eventrespo.component.css'
})
export class DetailsEventrespoComponent implements OnInit {
  idEvenement: number | null = null;
  eventDetails: any = {};
  constructor(private evenementService: EvenementService,private route : ActivatedRoute) {}
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
        },
        (error) => {
          console.error('Error loading event details:', error);
        }
      );
    }
  }

  Refuser() {
    if (this.idEvenement !== null) {
      this.evenementService.updateState(this.idEvenement, false).subscribe(
        (data) => {
          console.log('Event state updated to refused:', data);
          this.loadEventDetails(); // Refresh event details after update
        },
        (error) => {
          console.error('Error updating event state:', error);
        }
      );
    }
  }

  Accepter() {
    if (this.idEvenement !== null) {
      this.evenementService.updateState(this.idEvenement, true).subscribe(
        (data) => {
          console.log('Event state updated to refused:', data);
          this.loadEventDetails(); // Refresh event details after update
        },
        (error) => {
          console.error('Error updating event state:', error);
        }
      );
    }
  }
  
}
