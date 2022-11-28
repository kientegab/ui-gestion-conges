import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { GalerieComponent } from './galerie/galerie.component';
import { AdministrationRoutingModule } from '../administration/administration-routing.module';
import { CongeAnnuelComponent } from './decision-conges/conge-annuel/conge-annuel.component';
import { JouissanceAnnuelleComponent } from './autorisation-absences/jouissance-annuelle/jouissance-annuelle.component';
import { JouissanceExamenComponent } from './autorisation-absences/jouissance-examen/jouissance-examen.component';
import { JouissanceSNDComponent } from './autorisation-absences/jouissance-snd/jouissance-snd.component';
import { AutreAbsencesComponent } from './autorisation-absences/autre-absences/autre-absences.component';
import { CongeMaladieComponent } from './decision-conges/conge-maladie/conge-maladie.component';
import { CongeMaterniteComponent } from './decision-conges/conge-maternite/conge-maternite.component';
import { CongeFinserviceComponent } from './decision-conges/conge-finservice/conge-finservice.component';
import { ContactComponent } from './contact/contact.component';
import { CommentCaMarcheComponent } from './comment-ca-marche/comment-ca-marche.component';
import { RechercherActeComponent } from './rechercher-acte/rechercher-acte.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { NbAutocompleteModule } from '@nebular/theme';




@NgModule({
  declarations: [
  CongeAnnuelComponent,
  JouissanceAnnuelleComponent,
  JouissanceExamenComponent,
  JouissanceSNDComponent,
  AutreAbsencesComponent,
  CongeMaladieComponent,
  CongeMaterniteComponent,
  CongeFinserviceComponent,
  ContactComponent,
  CommentCaMarcheComponent,
  RechercherActeComponent,
 
  ],
  imports: [

  CommonModule,
  PublicRoutingModule,
  ContextMenuModule,
  TableModule,
  DividerModule,
  DropdownModule,
  NbAutocompleteModule
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PublicModule { }
