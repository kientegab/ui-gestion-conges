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



@NgModule({
  declarations: [
  CongeAnnuelComponent,
  JouissanceAnnuelleComponent,
  JouissanceExamenComponent,
  JouissanceSNDComponent,
  AutreAbsencesComponent,
  ],
  imports: [
  


  CommonModule,
  PublicRoutingModule,
    
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PublicModule { }
