import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from '../administration/example/example.component';
import { LoginComponent } from '../theme/components/login/login.component';
import { ThemeLandingComponent } from '../theme/components/theme-landing/theme-landing.component';
import { AutreAbsencesComponent } from './autorisation-absences/autre-absences/autre-absences.component';
import { JouissanceAnnuelleComponent } from './autorisation-absences/jouissance-annuelle/jouissance-annuelle.component';
import { JouissanceExamenComponent } from './autorisation-absences/jouissance-examen/jouissance-examen.component';
import { JouissanceSNDComponent } from './autorisation-absences/jouissance-snd/jouissance-snd.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CongeAnnuelComponent } from './decision-conges/conge-annuel/conge-annuel.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';

export const routes: Routes = [
  // { path: '', component: DashboardComponent, pathMatch: 'full' },
   
   { path:'public', component: PublicDashboardComponent,
   children: [
     {
       path: '', component: DashboardComponent, pathMatch: 'full'
     },
     {
      path: 'conges', component: CongeAnnuelComponent
    },
    {
      path: 'jouissAnnuelle', component: JouissanceAnnuelleComponent
    },
    {
      path: 'jouissExamen', component: JouissanceExamenComponent
    },
    {
      path: 'jouissSND', component: JouissanceSNDComponent
    },
    {
      path: 'jouissAutre', component: AutreAbsencesComponent
    },
      
   ]
   },
 
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PublicRoutingModule { }
