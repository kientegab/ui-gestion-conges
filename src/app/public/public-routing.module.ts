import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from '../administration/example/example.component';
import { LoginComponent } from '../theme/components/login/login.component';
import { ThemeLandingComponent } from '../theme/components/theme-landing/theme-landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicDashboardComponent } from './public-dashboard/public-dashboard.component';

export const routes: Routes = [
  // { path: '', component: DashboardComponent, pathMatch: 'full' },
   
   { path:'', component: PublicDashboardComponent,
   children: [
     {
       path: '', component: DashboardComponent, pathMatch: 'full'
     }
   ]
   },
 
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
