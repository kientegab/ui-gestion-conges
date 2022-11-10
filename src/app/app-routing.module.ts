import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { PublicDashboardComponent } from './public/public-dashboard/public-dashboard.component';

const routes: Routes = [
  { path:'', component: PublicDashboardComponent,
  children: [
    {
      path: '', component: DashboardComponent, pathMatch: 'full'
    }
  ]
  },
  ];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
