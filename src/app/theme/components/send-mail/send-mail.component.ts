import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPasswordForgot, PasswordForgot } from 'src/app/shared/models/vo/password-forgot';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {

  isSuccessful = false;
  loading = false;
  dialogErrorMessage!: string;
  passwordForget: IPasswordForgot = new PasswordForgot();
  spinner: boolean = true;
  erreur: boolean = true;
  messageErreur: string = "";
 
  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.spinner = false;
    this.erreur = true;
    this.authService.passwordForget(this.passwordForget).subscribe(
      (data) => {
        this.spinner = true;
        this.isSuccessful = true;
      },
      (error) => this.handleError(error)
    );
  }


// Errors
handleError(error: HttpErrorResponse) {
  this.spinner = true;
  this.erreur = false;
  console.error(`Processing Error: ${JSON.stringify(error)}`);
  //this.messageErreur = error.error.message;
}
}
