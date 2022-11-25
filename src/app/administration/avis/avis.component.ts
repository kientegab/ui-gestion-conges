import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Avis } from 'src/app/shared/models/avis.model';
import { AvisService } from 'src/app/shared/services/avis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {


  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  aviss!: Avis[];
  avis: Avis = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  avisDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private avisService: AvisService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.avis.id;
  }
  // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.avisService.getAll().subscribe(response => {
      this.isLoading = false;
      this.aviss = response.aviss;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.avis.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.avis = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.avisService.create(this.avis).subscribe(response => {
      if (this.aviss.length !== this.recordsPerPage) {
        this.aviss.push(response);
        this.aviss = this.aviss.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.avis = Object.assign({}, selection);
    this.clearDialogMessages();
    this.avisDetail = true;
  }

  // Edit
  onEdit(selection: any) {
    this.avis = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.avisService.update(this.avis).subscribe(response => {
      let index = this.aviss.findIndex(avis => avis.id === response.id);
      this.aviss[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure modifié avec succès' });
    }, error => this.handleError(error));
  }


  // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce type Structure?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.avisService.delete(selection.id).subscribe(() => {
      this.aviss = this.aviss.filter(avis => avis.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'avis supprimé avec succès',
      });
    }, (error) => this.handleError(error)
    );
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
