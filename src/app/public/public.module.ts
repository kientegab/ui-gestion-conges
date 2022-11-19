import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { GalerieComponent } from './galerie/galerie.component';
import { AdministrationRoutingModule } from '../administration/administration-routing.module';



@NgModule({
  declarations: [
  
  ],
  imports: [
  


  CommonModule,
    PublicRoutingModule,
    
   
  ]
})
export class PublicModule { }
