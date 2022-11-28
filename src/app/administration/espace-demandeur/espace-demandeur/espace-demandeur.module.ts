import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceDemandeurRoutingModule } from './espace-demandeur-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ContextMenuModule } from 'primeng/contextmenu';
import { HttpClientModule } from '@angular/common/http';
import { AutorisationComponent } from './autorisation/autorisation.component';
;




@NgModule({
  declarations: [
    AutorisationComponent,
  ],
  imports: [
    CommonModule,
    EspaceDemandeurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    CardModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    HttpClientModule,
    ContextMenuModule,
    InputTextModule,
    FileUploadModule,
  ],
  providers: [ConfirmationService,MessageService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EspaceDemandeurModule { }
