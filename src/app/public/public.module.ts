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



@NgModule({
  declarations: [
  CongeAnnuelComponent,
  JouissanceAnnuelleComponent,
  ],
  imports: [
  


  CommonModule,
  PublicRoutingModule,
    
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PublicModule { }
