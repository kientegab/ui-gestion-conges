import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceSHIRoutingModule } from './espace-shi-routing.module';
import { EspaceShiMenuComponent } from './espace-shi-menu/espace-shi-menu.component';
import { AutorisationComponent } from './autorisation/autorisation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import {PanelModule} from 'primeng/panel';

@NgModule({
  declarations: [
    EspaceShiMenuComponent,
    AutorisationComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,  
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    EspaceSHIRoutingModule,
    CardModule,
    PanelModule
    
  ],
  providers: [ConfirmationService,MessageService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EspaceSHIModule { }
