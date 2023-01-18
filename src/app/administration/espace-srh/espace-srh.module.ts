import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceSRHRoutingModule } from './espace-srh-routing.module';
import { AutorisationSComponent } from './autorisation-s/autorisation-s.component';
import { DashboardSComponent } from './dashboard-s/dashboard-s.component';
import { ActeAutorisationsComponent } from './acte-autorisations/acte-autorisations.component';


@NgModule({
  declarations: [
    AutorisationSComponent,
    DashboardSComponent,
    ActeAutorisationsComponent
  ],
  imports: [
    CommonModule,
    EspaceSRHRoutingModule
  ]
})
export class EspaceSRHModule { }
