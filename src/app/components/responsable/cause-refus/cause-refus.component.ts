import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvenementService } from '../../../services/alleventservice';
import {MatIcon} from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cause-refus',
  templateUrl: './cause-refus.component.html',
  styleUrls: ['./cause-refus.component.css'],
  imports: [
    MatIcon,
    ReactiveFormsModule
  ]
})
export class CauseRefusComponent implements OnInit {
  _causeRefusForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private evenementService: EvenementService,
    private dialogRef: MatDialogRef<CauseRefusComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { idEvenement: number }
  ) {
    this._causeRefusForm = this._formBuilder.group({
      causeRefus: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this._causeRefusForm.valid) {
      const causeRefus = this._causeRefusForm.value.causeRefus;
      const idEvenement = this.data.idEvenement;

      this.evenementService
        .updateDecisionAndCauseRefus(idEvenement, 'Refusé', causeRefus)
        .subscribe(
          (response) => {
            console.log('Décision mise à jour:', response);
            this.dialogRef.close(true); // Retourne une réponse positive pour signaler que l'opération est terminée
            this.router.navigate(['/eventsRespo']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la décision:', error);
          }
        );
    }
  }
}
