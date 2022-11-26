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
import { PrivilegeComponent } from './privilege/privilege.component';
import { ProfilComponent } from './profil/profil.component';
import { ArticleComponent } from './article/article.component';
import { AgentComponent } from './agent/agent.component';
import { CorpsComponent } from './corps/corps.component';
import { CompteComponent } from './compte/compte.component';
import { AmpliationComponent } from './ampliation/ampliation.component';
import { AutorisationComponent } from './espace-demandeur/autorisation/autorisation.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path: 'workspace', component: ThemeLandingComponent,


  children: [

    {path: 'exemple', component: ExampleComponent },
    {path: 'privilege', component: PrivilegeComponent },
    {path: 'compte', component: CompteComponent },

    {path: 'profil', component: ProfilComponent },
    {path: 'exemple', component: ExampleComponent },
    {path: 'typeStructure', component: TypeStructureComponent },
    {path: 'typeDemande', component: TypeDemandeComponent },
    {path: 'structure', component: StructureComponent },
    { path: 'ministere', component: MinistereComponent },

    { path: 'visas', component: VisaComponent },
    { path: 'avis', component: AvisComponent },
    { path: 'motifAbsence', component: MotifAbsenceComponent },
    { path: 'modalPaiement', component: ModalPaiementComponent },
    { path: 'ampliation', component: AmpliationComponent },


    {path: 'exemple', component: ExampleComponent },
    {path: 'privilege', component: PrivilegeComponent },
    {path: 'profil', component: ProfilComponent },
    {path: 'article', component: ArticleComponent },
    {path: 'corps', component: CorpsComponent },
    {path: 'agent', component: AgentComponent },
    {path: 'autorisation', component: AutorisationComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class AdministrationRoutingModule { }
