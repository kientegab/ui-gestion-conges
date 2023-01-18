import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeLandingComponent } from 'src/app/theme/components/theme-landing/theme-landing.component';
import { ActeAutorisationsComponent } from './acte-autorisations/acte-autorisations.component';
import { AutorisationSComponent } from './autorisation-s/autorisation-s.component';
import { DashboardSComponent } from './dashboard-s/dashboard-s.component';

const routes: Routes = [
 
  { path: 'espacesrh', component: ThemeLandingComponent,


  children: [

   
    {path: 'dashboards', component: DashboardSComponent },
    {path: 'autorisations', component: AutorisationSComponent },
    {path: 'acte-autorisation', component: ActeAutorisationsComponent }
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceSRHRoutingModule { }
