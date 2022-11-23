import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../theme/components/login/login.component';
import { ThemeLandingComponent } from '../theme/components/theme-landing/theme-landing.component';
import { ExampleComponent } from './example/example.component';
import { TypeStructureComponent } from './type-structure/type-structure.component';
import { TypeDemandeComponent } from './type-demande/type-demande.component';
import { StructureComponent } from './structure/structure.component';
import { MinistereComponent } from './ministere/ministere.component';
import { VisaComponent } from './visa/visa.component';
import { AvisComponent } from './avis/avis.component';
import { MotifAbsenceComponent } from './motif-absence/motif-absence.component';
import { ModalPaiementComponent } from './modal-paiement/modal-paiement.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path: 'workspace', component: ThemeLandingComponent,


  children: [
    {path: 'exemple', component: ExampleComponent },
    {path: 'typeStructure', component: TypeStructureComponent },
    {path: 'typeDemande', component: TypeDemandeComponent },
    {path: 'structure', component: StructureComponent },
    { path: 'ministere', component: MinistereComponent },
    
    { path: 'visa', component: VisaComponent },
    { path: 'avis', component: AvisComponent },
    { path: 'motifAbsence', component: MotifAbsenceComponent },
    { path: 'modalPaiement', component: ModalPaiementComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class AdministrationRoutingModule { }
