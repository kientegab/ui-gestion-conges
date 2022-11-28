import { CheckboxModule } from 'primeng/checkbox';
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
import { AvisComponent } from './avis/avis.component';
import { VisaComponent } from './visa/visa.component';
import { MotifAbsenceComponent } from './motif-absence/motif-absence.component';
import { ModalPaiementComponent } from './modal-paiement/modal-paiement.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { ProfilComponent } from './profil/profil.component';
import { ArticleComponent } from './article/article.component';
import { CorpsComponent } from './corps/corps.component';
import { AgentComponent } from './agent/agent.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutorisationComponent } from './espace-demandeur/autorisation/autorisation.component';
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from '../theme/components/login/login.component';
import { CompteComponent } from './compte/compte.component';
import { VisaTypeDemandeComponent } from './visa-type-demande/visa-type-demande.component';
import { AmpliationComponent } from './ampliation/ampliation.component';
import { DashboardComponent } from './espace SHI/espace-shi/dashboard/dashboard.component';


@NgModule({
  declarations: [
  //  ExempleComponent
      ExampleComponent,
       ExampleComponent,
       PrivilegeComponent,
       ProfilComponent,
       TypeDemandeComponent,
       TypeStructureComponent,
       StructureComponent,
       MinistereComponent,
       AvisComponent,
       VisaComponent,
       MotifAbsenceComponent,
       ModalPaiementComponent,
       AutorisationComponent,
       DashboardComponent,
       CompteComponent,
       VisaTypeDemandeComponent,

  //  ExempleComponent
       ExampleComponent,
       PrivilegeComponent,
       ProfilComponent,
       ArticleComponent,
       CorpsComponent,
       AgentComponent,
       CompteComponent,
       VisaTypeDemandeComponent,
       AmpliationComponent
  ],
  imports: [
  AdministrationRoutingModule,
    AppCommonModule,
    CommonModule,
    ReactiveFormsModule,
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
    ProgressSpinnerModule,
    HttpClientModule,
    ContextMenuModule,
    InputTextModule,
    FileUploadModule,
  ],
  providers: [ConfirmationService,MessageService],
 schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdministrationModule { }
