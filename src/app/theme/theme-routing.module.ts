
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilUserComponent } from './components/profil-user/profil-user.component';
import { CompteValidationComponent } from './components/compte-validation/compte-validation.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'profil/user', component: ProfilUserComponent },
  { path:'account/activate', component: CompteValidationComponent},
  { path: 'mot-de-passe-oublier', component: SendMailComponent}
    
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
