import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeLandingComponent } from 'src/app/theme/components/theme-landing/theme-landing.component';
import { ExampleComponent } from '../../example/example.component';
import { AutorisationComponent } from '../espace-shi/autorisation/autorisation.component';
import { CongeComponent } from './conge/conge.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
 
  { path: 'espaceshi', component: ThemeLandingComponent,


  children: [

    {path: 'exemple', component: ExampleComponent},
    {path: 'autorisation', component: AutorisationComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'conge', component:CongeComponent}
    
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceSHIRoutingModule { }
