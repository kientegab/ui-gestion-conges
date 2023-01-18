import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceRedacteurDrhRoutingModule } from './espace-redacteur-drh-routing.module';
import { DemandeCongeEncoursComponent } from './demande-conge-encours/demande-conge-encours.component';
import { DemandeCongeTraitesComponent } from './demande-conge-traites/demande-conge-traites.component';
import { ActeCongesComponent } from './acte-conges/acte-conges.component';
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
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpClientModule } from '@angular/common/http';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [
    DemandeCongeEncoursComponent,
    DemandeCongeTraitesComponent,
    ActeCongesComponent
  ],
  imports: [
    CommonModule,
    EspaceRedacteurDrhRoutingModule,
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
  ]
})
export class EspaceRedacteurDrhModule { }
