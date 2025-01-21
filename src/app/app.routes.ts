import { Routes } from '@angular/router';
import { LoginComponent } from './components/connexion/login/login.component';
import { AppComponent } from './app.component';
import { AccueilVisiteurComponent } from './components/visiteur/accueil-visiteur/accueil-visiteur.component';
import { AccueilEtudiantComponent } from './components/etudiant/accueil-etudiant/accueil-etudiant.component';
import { EventsDispoComponent } from './components/etudiant/events-dispo/events-dispo.component';
import { EventsEtudiantComponent } from './components/etudiant/events-etudiant/events-etudiant.component';
import { DetailEventComponent } from './components/etudiant/detail-event/detail-event.component';
import { NotificationsEtudComponent } from './components/etudiant/notifications-etud/notifications-etud.component';
import { ProfilEtudComponent } from './components/etudiant/profil-etud/profil-etud.component';
import { AccueilRespoComponent } from './components/responsable/accueil-respo/accueil-respo.component';
import { EventsRespoComponent } from './components/responsable/events-respo/events-respo.component';
import { DetailsEventrespoComponent } from './components/responsable/details-eventrespo/details-eventrespo.component';
import { NotificationsRespoComponent } from './components/responsable/notifications-respo/notifications-respo.component';
import { ProfilRespoComponent } from './components/responsable/profil-respo/profil-respo.component';
import { ListeEventsComponent } from './components/admin/liste-events/liste-events.component';
import { ModifierEventComponent } from './components/admin/modifier-event/modifier-event.component';
import { AjouterEventComponent } from './components/admin/ajouter-event/ajouter-event.component';
import { AllParticipantsComponent } from './components/admin/all-participants/all-participants.component';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';
import { DecisionsResposComponent } from './components/admin/decisions-respos/decisions-respos.component';

export const routes: Routes = [
    
    {path :"connexion", component: LoginComponent},
    {path :"", component: AccueilVisiteurComponent},
    {path :"etudiant", component: AccueilEtudiantComponent},
    {path :"eventsdipo", component: EventsDispoComponent},
    {path :"eventsetud", component: EventsEtudiantComponent},
    {path :"detailevent/:idEvenement", component: DetailEventComponent},
    {path :"notifications", component: NotificationsEtudComponent},
    {path :"profil", component: ProfilEtudComponent},
    {path :"responsable", component: AccueilRespoComponent},
    {path :"eventsRespo", component: EventsRespoComponent},
    { path: 'detailsEventRespo/:idEvenement', component: DetailsEventrespoComponent },
    {path :"notificationsRespo", component: NotificationsRespoComponent},
    {path :"profilRespo", component: ProfilRespoComponent},
    {path :"listeEvents", component: ListeEventsComponent},
    {path :"modifierevent/:idEvenement", component: ModifierEventComponent},
    {path :"ajouterevent", component: AjouterEventComponent},
    {path :"participants", component: AllParticipantsComponent},
    {path :"statistics", component: StatisticsComponent},
    {path :"decisionsresponsables", component: DecisionsResposComponent},

];
