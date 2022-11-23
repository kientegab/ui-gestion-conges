import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { ConfirmationService } from 'primeng/api/confirmationservice';
import { MessageService } from 'primeng/api';

import { ThemeLandingComponent } from '../theme/components/theme-landing/theme-landing.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NbButtonModule, NbCardModule, NbSelectModule, NbStepperModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SortIcon, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { AppCommonModule } from '../shared/common/app-common.module';
import { ActionsToolbalIudComponent } from '../shared/common/actions-toolbal-iud/actions-toolbal-iud.component';
import { ExampleComponent } from './example/example.component';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TypeDemandeComponent } from './type-demande/type-demande.component';
import { TypeStructureComponent } from './type-structure/type-structure.component';
import { StructureComponent } from './structure/structure.component';
import { MinistereComponent } from './ministere/ministere.component';


@NgModule({
  declarations: [
   
  //  ExempleComponent
  
    ExampleComponent,
       TypeDemandeComponent,
       TypeStructureComponent,
       StructureComponent,
       MinistereComponent
  ],
  imports: [
AdministrationRoutingModule,
    AppCommonModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    HttpClientModule,
    ContextMenuModule,
   
   
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdministrationModule { }
