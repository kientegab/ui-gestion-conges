import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { ModalPaiement } from 'src/app/shared/models/modalPaiement.model';
import { ModalPaiementService } from 'src/app/shared/services/modal-paiement.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-paiement',
  templateUrl: './modal-paiement.component.html',
  styleUrls: ['./modal-paiement.component.scss']
})
export class ModalPaiementComponent implements OnInit {


  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  modalPaiements!: ModalPaiement[];
  modalPaiement: ModalPaiement = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  modalPaiementDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private modalPaiementService: ModalPaiementService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.modalPaiement.id;
  }
  // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.modalPaiementService.getAll().subscribe(response => {
      this.isLoading = false;
      this.modalPaiements = response.modalPaiements;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.modalPaiement.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.modalPaiement = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.modalPaiementService.create(this.modalPaiement).subscribe(response => {
      if (this.modalPaiements.length !== this.recordsPerPage) {
        this.modalPaiements.push(response);
        this.modalPaiements = this.modalPaiements.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.modalPaiement = Object.assign({}, selection);
    this.clearDialogMessages();
    this.modalPaiementDetail = true;
  }

  // Edit
  onEdit(selection: any) {
    this.modalPaiement = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.modalPaiementService.update(this.modalPaiement).subscribe(response => {
      let index = this.modalPaiements.findIndex(modalPaiement => modalPaiement.id === response.id);
      this.modalPaiements[index] = response;
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
    this.modalPaiementService.delete(selection.id).subscribe(() => {
      this.modalPaiements = this.modalPaiements.filter(modalPaiement => modalPaiement.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'modalPaiement supprimé avec succès',
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