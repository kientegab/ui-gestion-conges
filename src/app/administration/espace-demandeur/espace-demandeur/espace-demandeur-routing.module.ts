import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeLandingComponent } from 'src/app/theme/components/theme-landing/theme-landing.component';
import { AutorisationComponent } from '../../espace SHI/espace-shi/autorisation/autorisation.component';
import { AutorisationdComponent } from './autorisationd/autorisationd.component';
import { CongedComponent } from './conged/conged.component';
import { DashboarddComponent } from './dashboardd/dashboardd.component';


const routes: Routes = [
 
  { path: 'espacedemandeur', component: ThemeLandingComponent,


  children: [

   
    {path: 'dashboardd', component: DashboarddComponent },
    {path: 'autorisationd', component: AutorisationdComponent },
    {path: 'conged', component: CongedComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EspaceDemandeurRoutingModule { }
