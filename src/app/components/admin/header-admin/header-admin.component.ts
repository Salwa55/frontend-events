import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header-admin',
  imports: [],
  templateUrl: './header-admin.component.html',
  standalone: true,
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['connexion']).then(() => {
      window.location.reload();
    });; 

  }

}
