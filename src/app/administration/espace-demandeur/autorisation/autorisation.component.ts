
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { Demande } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';


import { environment } from 'src/environments/environment';
import { Utilisateur } from '../../../shared/models/demande.model';

@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.scss']
})
export class AutorisationComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  demandes!: Demande[];
  demande: Demande= {};
  ministeres!: Ministere[];
  typeDemandes!: TypeDemande[];
  typedemande: TypeDemande={};
  utilisateur:  Utilisateur={};
  motifAbsences!: MotifAbsence[];
  motifAbsence: MotifAbsence={};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  demandeDetail: boolean=false;
  file: Blob | string = '';
  message: any;
  dialogErrorMessage: any;
  constructor(
    private autorisationService: AutorisationService ,
    private typeDemandeService: TypeDemandeService,
    private motifAbsenceService: MotifAbsenceService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadTypedemande();
    // this.loadMinisteres();
  }

  isEditing() {
    return !!this.demande.id;
  }

  // loadMinisteres(event?: LazyLoadEvent) {
  //   this.isLoading = true;
  //   this.ministereService.getAll().subscribe(
  //     (response) => {
  //       this.isLoading = false;
  //       this.ministeres = response.ministeres;
  //     },
  //     (error) => {
  //       this.message = { severity: 'error', summary: error.error };
  //     }
  //   );
  // }

  loadTypedemande(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeDemandeService.getAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.typeDemandes = response.typeDemandes;

        console.log("type demande", this.typeDemandes);
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }

  // onSelectMinistere(){
  // //  console.log("on select"+this.demande.ministere);
  //   if(this.demande.ministere)
  //   {
  //     this.getMinisteredemandes();
  //   }
  // }

  //Liste des structutes d'un ministere
  // getMinisteredemandes(event?: any) {
  //   let ministereId = this.demande.ministere?.id;
  //   // console.log("get ministere struct"+this.demande.ministere);
  //   // console.log("id",ministereId);
  //   this.isLoading = true;
  //   this.demandeService.getdemandeByMinistereId(ministereId?ministereId:null).subscribe(
  //     (response) => {
  //       this.isLoading = false;
  //       this.ministeredemandes = response.demandes;
  //     },
  //     (error) => {
  //       this.message = { severity: 'error', summary: error.error };
  //     }
  //   );
  // }

 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.autorisationService.getAll().subscribe(response => {
      this.isLoading = false;
      this.demandes = response.demandes;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.demande.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.demande = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.autorisationService.create(this.demande).subscribe(response => {
      if (this.demandes.length !== this.recordsPerPage) {
        this.demandes.push(response);
        this.demandes = this.demandes.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'demande créée avec succès' });
    }, error => this.handleError(error));
  }

  onSelectFile(event:any): void {
    // console.log(event.files[0]);
    // console.log(event.files[0].name);
    let file:File = event.files[0];
    this.file = file;
    // this.document.fileName =  event.files[0].name;
    // this.document.fileSize = event.files[0].size;
  }

  //Détail
  onInfo(selection: any) {
    this.demande = Object.assign({}, selection);
    this.clearDialogMessages();
    this.demandeDetail=true;
  }

   // Edit
    onEdit(selection: any) {
      this.demande = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.autorisationService.update(this.demande).subscribe(response => {
        let index = this.demandes.findIndex(demande => demande.id === response.id);
        this.demandes[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'demande modifiée avec succès' });
      }, error => this.handleError(error));
    }

  //Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer cette  demande?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.autorisationService.delete(selection.id).subscribe(() => {
      this.demandes = this.demandes.filter(demande => demande.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Demande supprimée avec succès',
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
