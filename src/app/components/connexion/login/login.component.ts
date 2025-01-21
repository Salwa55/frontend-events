import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/loginservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit, AfterViewInit  {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  userId: number | null = null;

  constructor(private loginService: LoginService,
  private router: Router) {}
  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.message === 'Connexion réussie') {
          // Stockage de l'ID et du rôle
          this.userId = response.id;
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('role', response.role);

          // Messages de succès
          this.successMessage = 'Connexion réussie !';
          this.errorMessage = '';
          // Vérifier le rôle et rediriger
          const role = localStorage.getItem('role');
          if (role === 'Etudiant') {
            this.router.navigate(['etudiant']).then(() => {
              window.location.reload();
            });
          } else if (role === 'Responsable') {
            this.router.navigate(['responsable']).then(() => {
              window.location.reload();
            });;  // Rediriger vers la page Responsable
          }else if (role === 'Admin') {
            this.router.navigate(['statistics']).then(() => {
              window.location.reload();
            });;  // Rediriger vers la page Admin
          }

          // Affichage dans la console
          console.log('Connexion réussie avec les détails :', {
            userId: this.userId,
            role: response.roleUser,
            email: this.email
          });

          // Réinitialisation des champs du formulaire
          this.email = '';
          this.password = '';
        } else {
          this.errorMessage = 'Réponse invalide du serveur.';
          console.error('Réponse du serveur invalide :', response);
        }
      },
      error: (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
        console.error('Erreur de connexion :', error);
        this.successMessage = '';
      }
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
}
