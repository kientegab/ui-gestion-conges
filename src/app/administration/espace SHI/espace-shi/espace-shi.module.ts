import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceSHIRoutingModule } from './espace-shi-routing.module';
import { EspaceShiMenuComponent } from './espace-shi-menu/espace-shi-menu.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import {PanelModule} from 'primeng/panel/primeng-panel';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AutorisationComponent } from '../espace-shi/autorisation/autorisation.component';
import { CongeComponent } from './conge/conge.component';


@NgModule({
  declarations: [
    EspaceShiMenuComponent,
    AutorisationComponent,
    DashboardComponent,
    CongeComponent
  ],
  imports: [

  CommonModule,
    AppCommonModule,  
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    EspaceSHIRoutingModule,
    CardModule,
    PanelModule,
    CalendarModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    MessageModule,
    ProgressBarModule,
    DialogModule,
    DividerModule, 
    TableModule,
    
    ConfirmDialogModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ContextMenuModule,
    InputTextModule,
    
    
  ],
  providers: [ConfirmationService,MessageService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EspaceSHIModule { }
