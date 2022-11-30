import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { TypeVisa } from 'src/app/shared/models/typeVisa.model';
import { Visa } from 'src/app/shared/models/visa.model';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { TypeVisaService } from 'src/app/shared/services/type-visa.service';
import { VisaService } from 'src/app/shared/services/visa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-type-visa',
  templateUrl: './type-visa.component.html',
  styleUrls: ['./type-visa.component.scss']
})
export class TypeVisaComponent implements OnInit {


  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  typeVisas!: TypeVisa[];
  typeVisa: TypeVisa= {};
  visas! : Visa[];
  visa : Visa={}
  typeDemandes! : TypeDemande[];
  typeDemande:TypeDemande={};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  ministereDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private typeVisaService: TypeVisaService,
    private visaService: VisaService,
    private typeDemandeService : TypeDemandeService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadVisa();
    this.loadTypeDemande();
  }

  isEditing() {
    return !!this.typeVisa.id;
  }
 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeVisaService.getAll().subscribe(response => {
      this.isLoading = false;
      this.typeVisas = response.typeVisas;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
//chargement de visa
  loadVisa(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.visaService.getAll().subscribe(response => {
      this.isLoading = false;
      this.visas = response.visas;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  loadTypeDemande(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeDemandeService.getAll().subscribe(response => {
      this.isLoading = false;
      this.typeDemandes = response.typeDemandes;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


  //Chargement de typeDemande


  //Creation

  save() {
    if (this.typeVisa.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.typeVisa = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.typeVisaService.create(this.typeVisa).subscribe(response => {
      if (this.typeVisas.length !== this.recordsPerPage) {
        this.typeVisas.push(response);
        this.typeVisas = this.typeVisas.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type visa créée avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.typeVisa = Object.assign({}, selection);
    this.clearDialogMessages();
    this.ministereDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.typeVisa = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.typeVisaService.update(this.typeVisa).subscribe(response => {
        let index = this.typeVisas.findIndex(ministere => ministere.id === response.id);
        this.typeVisas[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'type visa modifiée avec succès' });
      }, error => this.handleError(error));
    }


    // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce  type visa?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.typeVisaService.delete(selection.id).subscribe(() => {
      this.typeVisas = this.typeVisas.filter(ministere => ministere.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'type visa supprimée avec succès',
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
