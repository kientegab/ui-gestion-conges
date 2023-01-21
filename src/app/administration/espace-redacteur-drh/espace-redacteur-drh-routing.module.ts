import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeLandingComponent } from 'src/app/theme/components/theme-landing/theme-landing.component';
import { ActeCongesComponent } from './acte-conges/acte-conges.component';
import { DemandeCongeEncoursComponent } from './demande-conge-encours/demande-conge-encours.component';

const routes: Routes = [
 
  { path: 'espacedrh', component: ThemeLandingComponent,


  children: [

    {path: 'conge', component: DemandeCongeEncoursComponent},
    {path: 'acte-conge', component: ActeCongesComponent},
    
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EspaceRedacteurDrhRoutingModule { }
