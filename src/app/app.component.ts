import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';  // Importer HeaderComponent
import { FooterComponent } from './components/footer/footer.component'; 
import { HeaderEtudiantComponent } from './components/etudiant/header-etudiant/header-etudiant.component';
import { HeaderRespoComponent } from './components/responsable/header-respo/header-respo.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderEtudiantComponent, HeaderRespoComponent, HeaderAdminComponent],
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-events';
}
