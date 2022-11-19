import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../theme/components/login/login.component';
import { ThemeLandingComponent } from '../theme/components/theme-landing/theme-landing.component';
import { ExampleComponent } from './example/example.component';


const routes: Routes = [
  
  { path: 'workspace', component: ThemeLandingComponent,


  children: [
    
    {path: 'exemple', component: ExampleComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 
exports: [RouterModule]
})
export class AdministrationRoutingModule { }
