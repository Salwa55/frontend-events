import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/userservice';
import { User } from '../../../models/Users';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profil-etud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './profil-etud.component.html',
  styleUrls: ['./profil-etud.component.css']
})
export class ProfilEtudComponent {
  private userService = inject(UserService);
  
  username = signal<string>('Nom Etudiant');
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
    }),
    role: new FormControl('ETUD', { nonNullable: true }), // Rôle par défaut pour étudiant
    password: new FormControl('', { nonNullable: true }) // Laisser vide ou valeur par défaut
  });

  constructor() {
    this.loadUserData();
  }

  private loadUserData(): void {
    const userId = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis localStorage
    if (userId) {
      this.isLoading.set(true);
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          console.log('Données reçues:', user); // Pour déboguer
          if (user) {
            this.profileForm.patchValue({
              lastname: user.lastname,
              username: user.username,
              email: user.email,
              telephone: user.telephone,
              role: user.roleUser, // Mettre à jour le rôle depuis les données de l'utilisateur
              password: user.password // Charger le mot de passe si nécessaire
            });
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
    } else {
      console.error('Aucun utilisateur connecté');
      this.isLoading.set(false);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      const userId = localStorage.getItem('userId'); // Récupérer l'ID utilisateur depuis localStorage
      if (userId) {
        this.userService.updateUser(Number(userId), {
          lastname: this.profileForm.value.lastname!,
          username: this.profileForm.value.username!,
          email: this.profileForm.value.email!,
          telephone: this.profileForm.value.telephone!,
          roleUser: this.profileForm.value.role!, // Récupérer la valeur de role
          password: this.profileForm.value.password! // Récupérer la valeur du mot de passe
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
        console.error('Aucun utilisateur connecté');
        this.isLoading.set(false);
      }
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
