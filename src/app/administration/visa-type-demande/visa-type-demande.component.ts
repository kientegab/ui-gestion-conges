import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { VisaTypeDemande } from 'src/app/shared/models/visaTypeDemande.model';
import { VisaTYpeDemandeService } from 'src/app/shared/services/visa-type-demande.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visa-type-demande',
  templateUrl: './visa-type-demande.component.html',
  styleUrls: ['./visa-type-demande.component.scss']
})
export class VisaTypeDemandeComponent implements OnInit {



  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  visaTypeDemandes!: VisaTypeDemande[];
  visaTypeDemande: VisaTypeDemande= {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  typeDemandeDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private visaTYpeDemandeService: VisaTYpeDemandeService,
    private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {

this.load();
  }

 /* isEditing() {
    return !!this.visaTypeDemande.id;
  }*/



  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.visaTYpeDemandeService.getAll().subscribe(response => {
      this.isLoading = false;
      this.visaTypeDemandes = response.visaTypeDemandes;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

     // Errors
     handleError(error: HttpErrorResponse) {
      console.error(`Processing Error: ${JSON.stringify(error)}`);
      this.isDialogOpInProgress = false;
      this.dialogErrorMessage = error.error.title;
    }
     // Messages

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }

}
