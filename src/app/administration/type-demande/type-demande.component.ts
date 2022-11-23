import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-type-demande',
  templateUrl: './type-demande.component.html',
  styleUrls: ['./type-demande.component.scss']
})
export class TypeDemandeComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  typeDemandes!: TypeDemande[];
  typeDemande: TypeDemande= {};
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
    private typeDemandeService: TypeDemandeService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.typeDemande.id;
  }
 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeDemandeService.getAll().subscribe(response => {
      this.isLoading = false;
      this.typeDemandes = response.typeDemandes;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.typeDemande.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.typeDemande = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.typeDemandeService.create(this.typeDemande).subscribe(response => {
      if (this.typeDemandes.length !== this.recordsPerPage) {
        this.typeDemandes.push(response);
        this.typeDemandes = this.typeDemandes.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type de demande créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.typeDemande = Object.assign({}, selection);
    this.clearDialogMessages();
    this.typeDemandeDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.typeDemande = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.typeDemandeService.update(this.typeDemande).subscribe(response => {
        let index = this.typeDemandes.findIndex(typeDemande => typeDemande.id === response.id);
        this.typeDemandes[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'Type de demande modifié avec succès' });
      }, error => this.handleError(error));
    }


    // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce type de demande?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.typeDemandeService.delete(selection.id).subscribe(() => {
      this.typeDemandes = this.typeDemandes.filter(typeDemande => typeDemande.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Type de demande supprimé avec succès',
      });
    },(error) => this.handleError(error)
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
