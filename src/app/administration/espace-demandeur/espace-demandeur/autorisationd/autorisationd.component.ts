import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Agent } from 'src/app/shared/models/agent.model';
import { Demande, Utilisateur } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { Structure } from 'src/app/shared/models/structure.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { ImportedService } from 'src/app/shared/services/imported.service';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { environment } from 'src/environments/environment';
import { StructureService } from './../../../../shared/services/structure.service';
import { AuthenticationService } from './../../../../shared/services/authentication.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-autorisationd',
  templateUrl: './autorisationd.component.html',
  styleUrls: ['./autorisationd.component.scss']
})
export class AutorisationdComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  matricule!:any;
  demandes!:Demande[];
  demande:Demande= {};
  ministeres!: Ministere[];
  typeDemandes!:TypeDemande[];
  typedemande:TypeDemande={};
  lestypeDemandes:TypeDemande[]=[];
  //utilisateur:Agent={};
  agent:Agent={};
  shi: Agent={};
  structures!:Structure[];
  structure:Structure={};
  structureAgent:any;
  ministereAgent:any;
  structureAgentId:any;
  motifAbsences!: MotifAbsence[];
  motifAbsence: MotifAbsence={};
  autorisations:Demande[]=[];
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
  fileUpload!: ElementRef;
  listFiles:string [] = [];

  message: any;
  dialogErrorMessage: any;
  constructor(
    private autorisationService: AutorisationService,
    private typeDemandeService: TypeDemandeService,
    private motifAbsenceService: MotifAbsenceService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService,
    private authenticationService:AuthenticationService,
    private structureService: StructureService
  ) { }

  ngOnInit(): void {
     //A remplacer par le numero matricule de l'agent connecté
     this.matricule= this.authenticationService.getUsername();
     this.structureAgentId= this.authenticationService.getStructureId();
    this.getUtilisateurByMatricule(this.matricule);
    this.getUtilisateurStructure(this.structureAgentId);
    this.load();
    this.loadTypedemande();
    this.loadMotifAbsence();



  }

  isEditing() {
    return !!this.demande.id;
  }

  getUtilisateurStructure(structureId: any){
   this.structureService.getStructureById(structureId).subscribe(
    (response)=>{
      this.structure=response;
      this.structureAgent=this.structure.libelle;
      this.ministereAgent=this.structure.ministere?.libelle;
      console.log("struc lib", this.structureAgent)
    }
   )
  }

  getUtilisateurByMatricule(matricule:any) {
    this.isLoading = true;
    this.autorisationService.getUtilisateurByMatricule(matricule).subscribe(
      (response) => {
        this.isLoading = false;
        this.agent = response.agent;
         
        console.log("Retour get agent",this.agent);
        this.autorisationService.getUtilisateurByMatricule(this.agent.matriculeResp).subscribe(
          (response) => {
            this.isLoading = false;
            this.shi = response.agent;
             
            console.log("Retour get shi",this.shi);
            
            
          },
          (error) => {
            this.message = { severity: 'error', summary: error.error };
          }
        );
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
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
        this.typeDemandes=response.typeDemandes;
        this.typeDemandes.forEach(t => {
          let code:any=t.code;
          if(code.includes("JOUIS") || code.includes("AUTRE")){
            this.lestypeDemandes.push(t);
          }
        })
      }, error => {
        this.message = { severity: 'error', summary: error.error };
        console.error(JSON.stringify(error));
      });
    }



 // Affichage
 load(event?: LazyLoadEvent) {
  this.isLoading = true;
  this.autorisationService.getAllSHI().subscribe(response => {
    this.isLoading = false;
    this.demandes = response.demandes;
    this.demandes.forEach(t => {
      let typeDemande:any=t.typeDemande?.code
      if(typeDemande.includes("JOUIS") || typeDemande.includes("AUTRE")){
        this.autorisations.push(t);
      }
    })

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
    this.getUtilisateurByMatricule(this.matricule);
    

  }
 

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    const user ={
      id:this.agent.id,
      matricule:this.agent.matricule,
     
    };


  //  const fichesAsJson: Blob =new Blob([JSON.stringify(this.demande)], { type: 'application/json' })
  //  this.demande.agent=this.agent;
  //  this.demande.statusDemande="INITIATION";
  //  this.demande.positionDemande="DEMANDEUR";
  //  this.demande.dureeAbsence=0;
  //  this.demande.motifRejet="";
  //  this.demande.numeroDemande="";
  //  this.demande.lieuJouissanceBF="";
  //  this.demande.lieuJouissanceEtrang="";
  //  this.demande.situationSND="";
  //  this.demande.trancheDemande="";

  const data={
    agent: user,
    motifRejet:"pp",
    lieuJouissanceBF:"pp",
    lieuJouissanceEtrang:"pp",
    periodeDebut:this.demande.periodeDebut,
    periodeFin:this.demande.periodeFin,
    situationSND:"pp",
    refLastDecision:"rrr",
    dureeAbsence:0,
    statusDemande:"INITIATION",
    positionDemande:"DEMANDEUR",
    typeDemande:this.demande.typeDemande,
    motifAbsence:this.demande.motifAbsence
  }

    const formData: FormData = new FormData();
    formData.append('demande', JSON.stringify(data));
    formData.append("files", this.listFiles[0]);
    console.log('demande',data);
    console.log('formdata',formData);
    this.autorisationService.create(formData).subscribe(response => {
      // if (this.demandes.length !== this.recordsPerPage) {
      //   this.demandes.push(response);
      //   this.demandes = this.demandes.slice();
      // }
      // this.totalRecords++;
      this.load();
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
