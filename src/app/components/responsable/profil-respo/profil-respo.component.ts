import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/userservice';
import { User } from '../../../models/Users';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profil-respo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './profil-respo.component.html',
  styleUrls: ['./profil-respo.component.css']
})
export class ProfilRespoComponent {
  private userService = inject(UserService);
  
  username = signal<string>('Aya Mazhar');
  isLoading = signal<boolean>(false);
  
  profileForm = new FormGroup({
    lastname: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    username: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    }),
    email: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.email] 
    }),
    telephone: new FormControl('', { 
      nonNullable: true, 
      validators: [
        Validators.required, 
        Validators.pattern(/^[0-9]{10}$/)
      ] 
    })
  });

  constructor() {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.isLoading.set(true);
    this.userService.getUserById(2).subscribe({
      next: (user) => {
        console.log('Données reçues:', user); // Pour déboguer
        if (user) {
          this.profileForm.patchValue({
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            telephone: user.telephone
          });
          // Mettre à jour le nom affiché
          this.username.set(`${user.username} ${user.lastname}`);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      // Remplacez 1 par l'ID réel de l'utilisateur connecté
      this.userService.updateUser(1, {
        ...this.profileForm.getRawValue(),
        password: '', // Gérer le mot de passe selon votre logique
        roleUser: 'RESPO' // Ou la valeur appropriée
      }).subscribe({
        next: () => {
          this.username.set(
            `${this.profileForm.value.username} ${this.profileForm.value.lastname}`
          );
        },
        error: (error: Error) => {
          console.error('Erreur lors de la mise à jour:', error);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}