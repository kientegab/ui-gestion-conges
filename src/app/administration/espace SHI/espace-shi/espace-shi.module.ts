import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceSHIRoutingModule } from './espace-shi-routing.module';
import { EspaceShiMenuComponent } from './espace-shi-menu/espace-shi-menu.component';
import { EspaceShiDashboardComponent } from './espace-shi-dashboard/espace-shi-dashboard.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    EspaceShiMenuComponent,
    EspaceShiDashboardComponent,
    AutorisationComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    EspaceSHIRoutingModule,
    CardModule
  ]
})
export class EspaceSHIModule { }
