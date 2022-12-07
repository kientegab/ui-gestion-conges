import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GuardService } from '../guard/guard.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IAuthentication } from 'src/app/shared/models/authentication.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  rememberMe: boolean = false;
  spinner: boolean = true;
  erreur: boolean = true;
  messageErreur: string = "";

  timeoutHandle: any;
  authenticate: IAuthentication = {};
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;
  permissions : any;
  constructor(private authService: AuthenticationService,
    private router: Router,
    private guardService: GuardService) {
     if (this.guardService.isLoggedIn()) {
       this.router.navigate(['/workspace'])
       .then(() => {
         window.location.reload();
      });
    }
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {

  }

  handleError(error: HttpErrorResponse) {
    this.spinner = true;
    this.erreur = false;
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    //this.messageErreur = error.error.message;
  }

  logIn() {
    this.spinner = false;
    this.erreur = true;
    this.authenticate.username = this.username;
    this.authenticate.password = this.password;
    this.authenticate.rememberMe = this.rememberMe;
    //this.router.navigate(['/workspace'])
     this.authService.login(this.authenticate).subscribe(

      (response) => {
        this.spinner = true;
         this.authService.saveToken(response)
         this.router.navigate(['/workspace'])
        .then(() => {
          window.location.reload();
        });
       },
       (error) => this.handleError(error)
     );
  }

}
