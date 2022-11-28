import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeLandingComponent } from 'src/app/theme/components/theme-landing/theme-landing.component';
import { AutorisationComponent } from '../../espace SHI/espace-shi/autorisation/autorisation.component';


const routes: Routes = [
 
  { path: 'espacedemandeur', component: ThemeLandingComponent,


  children: [

   
    {path: 'autorisation', component: AutorisationComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceDemandeurRoutingModule { }
