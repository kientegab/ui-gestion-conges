import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Agent } from 'src/app/shared/models/agent.model';
import { Demande, Utilisateur } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conged',
  templateUrl: './conged.component.html',
  styleUrls: ['./conged.component.scss']
})
export class CongedComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  matricule!:string;
  demandes!:Demande[];
  demande:Demande= {};
  ministeres!: Ministere[];
  typeDemandes!:TypeDemande[];
  typedemande:TypeDemande={};
  utilisateur:Agent={};
  agent:Utilisateur={};
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
  files: Blob | string ='';
  uploadedFiles: any[] = [];
  // uploadedFiles!:FileList;
  fileUpload!: ElementRef;
  // fileslist:FileList=[] ;
  listFiles:string [] = [];

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
    this.loadMotifAbsence();
    //A remplacer par le numero matricule de l'agent connecté
    this.matricule= '224365';
    // this.getUtilisateurByMatricule(this.matricule);

    // console.log('Agent',this.agent);

  }

  isEditing() {
    return !!this.demande.id;
  }

  getUtilisateurByMatricule(matricule:string) {
    this.isLoading = true;
    this.autorisationService.getUtilisateurByMatricule(matricule).subscribe(
      (response) => {
        this.isLoading = false;
        this.utilisateur = response.agent;
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  //   this.agent.matricule="224365";
  //   this.agent.nom="OUEDRAOGO";
  //   this.agent.prenom="Aboubacar";
  //   this.agent.emploi="Technicien Supérieur";

  //  console.log('utilisateur',this.utilisateur)
  }

   loadMotifAbsence(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.motifAbsenceService.getAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.motifAbsences = response.motifAbsences;
        // console.log("motifAbsences", this.motifAbsences);
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }

  loadTypedemande(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeDemandeService.getAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.typeDemandes = response.typeDemandes;
        // console.log("type demande", this.typeDemandes);
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }



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
    // this.utilisateur={
    //   matricule:'224365',
    //   id:2,
    //   nom:'ADMIN',
    //   prenom:'ADMIN',
    // };
    // this.demande.utilisateur= this.utilisateur;
    this.demande.numeroDemande= "SPMABG31048";

    // const fichesAsJson: Blob =new Blob([JSON.stringify(this.demande)], { type: 'application/json' })
    const formData: FormData = new FormData();
    formData.append('demande', JSON.stringify(this.demande));
    // for (let i = 0; i < this.listFiles.length; i++) {
    //   formData.append("files[]", this.listFiles[i]);
    // }
    formData.append("files", this.listFiles[0]);
    console.log('demande',this.demande);
    console.log('formdata',formData);
    this.autorisationService.create(formData).subscribe(response => {
      if (this.demandes.length !== this.recordsPerPage) {
        this.demandes.push(response);
        this.demandes = this.demandes.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Demande enregistrée avec succès' });
    }, error => this.handleError(error));
  }

  onSelectFile(event:any): void {
    console.log(event.files[0]);
    console.log(event.files[0].name);
    let file:File = event.files[0];
    this.file = file;
    // this.document.fileName =  event.files[0].name;
    // this.document.fileSize = event.files[0].size;
  }

//on select file
// onUpload(event:any) : void{
//   this.uploadedFiles = new Array();
//   let file:File = event.files;
//   this.uploadedFiles.push(file);
//   console.log(this.uploadedFiles);
// }

  //on select file2
  onUpload(event:any) : void{
    this.listFiles = new Array();
    console.log(this.uploadedFiles);
    for (let i = 0; i < event.files.length; i++) {
      this.listFiles.push(event.files[i]);
      // console.log('index',i);
      // console.log('file',event.files[i]);
    }
    console.log('files',this.listFiles);
  }


  //On remove file
  onRemove(event:any){
    console.log(event.file);
    this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== event.file.name);
    console.log(this.uploadedFiles);
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
