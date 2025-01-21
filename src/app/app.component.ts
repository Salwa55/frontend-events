import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {CommonModule} from '@angular/common';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeaderAdminComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'frontend-events';
  userRole: string | null = null;

  ngOnInit() {
    this.updateUserRole();
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'role') {
      this.updateUserRole();
    }
  }

  private updateUserRole() {
    this.userRole = localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isResponsable(): boolean {
    return this.userRole === 'Responsable';
  }

  isEtudiant(): boolean {
    return this.userRole === 'Etudiant';
  }
}
