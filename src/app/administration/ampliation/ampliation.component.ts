import { Ampliation } from './../../shared/models/ampliation.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AmpliationService } from 'src/app/shared/services/ampliation.service';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ampliation',
  templateUrl: './ampliation.component.html',
  styleUrls: ['./ampliation.component.scss']
})
export class AmpliationComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  ampliations!: Ampliation[];
  ampliation: Ampliation = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  ampliationDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private ampliationService: AmpliationService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.ampliation.id;
  }
  // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.ampliationService.getAll().subscribe(response => {
      this.isLoading = false;
      this.ampliations = response.ampliations;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.ampliation.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.ampliation = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.ampliationService.create(this.ampliation).subscribe(response => {
      if (this.ampliations.length !== this.recordsPerPage) {
        this.ampliations.push(response);
        this.ampliations = this.ampliations.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.ampliation = Object.assign({}, selection);
    this.clearDialogMessages();
    this.ampliationDetail = true;
  }

  // Edit
  onEdit(selection: any) {
    this.ampliation = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.ampliationService.update(this.ampliation).subscribe(response => {
      let index = this.ampliations.findIndex(ampliation => ampliation.id === response.id);
      this.ampliations[index] = response;
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
    this.ampliationService.delete(selection.id).subscribe(() => {
      this.ampliations = this.ampliations.filter(ampliation => ampliation.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'ampliation supprimé avec succès',
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
