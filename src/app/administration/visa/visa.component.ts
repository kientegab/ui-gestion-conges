import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Visa } from 'src/app/shared/models/visa.model';
import { VisaTypeDemande } from 'src/app/shared/models/visaTypeDemande.model';
import { StructureService } from 'src/app/shared/services/structure.service';
import { VisaTYpeDemandeService } from 'src/app/shared/services/visa-type-demande.service';
import { VisaService } from 'src/app/shared/services/visa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent implements OnInit {


  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  visas!: Visa[];
  visa: Visa = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  visaDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  visaTypeDemandes!: VisaTypeDemande[];
  visaTypeDemande: VisaTypeDemande = {};


  constructor(
    private visaService: VisaService,
    private confirmationService: ConfirmationService,
    private visaTypeDemandeService: VisaTYpeDemandeService,
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadVisaTypeDemande();

  }

  isEditing() {
    return !!this.visa.id;
  }

  loadVisaTypeDemande(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.visaTypeDemandeService.getAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.visaTypeDemandes = response.visaTypeDemandes;

        console.log("type de visa par demande", this.visaTypeDemandes);
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }
  // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.visaService.getAll().subscribe(response => {
      this.isLoading = false;
      this.visas = response.visas;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.visa.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.visa = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.visaService.create(this.visa).subscribe(response => {
      if (this.visas.length !== this.recordsPerPage) {
        this.visas.push(response);
        this.visas = this.visas.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.visa = Object.assign({}, selection);
    this.clearDialogMessages();
    this.visaDetail = true;
  }

  // Edit
  onEdit(selection: any) {
    this.visa = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.visaService.update(this.visa).subscribe(response => {
      let index = this.visas.findIndex(visa => visa.id === response.id);
      this.visas[index] = response;
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
    this.visaService.delete(selection.id).subscribe(() => {
      this.visas = this.visas.filter(visa => visa.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'visa supprimé avec succès',
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
