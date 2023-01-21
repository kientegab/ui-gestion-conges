import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Agent } from 'src/app/shared/models/agent.model';
import { Demande } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { Structure } from 'src/app/shared/models/structure.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { Validation } from 'src/app/shared/models/validation.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { StructureService } from 'src/app/shared/services/structure.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  //Matri:string="admin2";
  recordsPerPage = environment.recordsPerPage;
  matricule!:string;
  demandes!:Demande[];
  demande:Demande= {};
  ministeres!: Ministere[];
  typeDemandes!:TypeDemande[];
  typedemande:TypeDemande={};
  validation:Validation={};
  //utilisateur:Agent={};
  agent:Agent={};
  shi: Agent={};
  structure:Structure={};
  structureAgent:any;
  motifAbsences!: MotifAbsence[];
  motifAbsence: MotifAbsence={};
  conges: Demande[]=[];
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
  enableBtnTreat=true;
  message: any;
  dialogErrorMessage: any;
  treatDialog:boolean=false;
  avisOptions:any[]=[{"libelle":"APPROUVEE", "valeur":"APPROVED"},
  {"libelle":"REJETEE","valeur":"REJECTED"}]
  constructor(
    private autorisationService: AutorisationService ,
    private typeDemandeService: TypeDemandeService,
    private motifAbsenceService: MotifAbsenceService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService,
    private authenticationService:AuthenticationService,
    private structureService: StructureService
  ) { }

  ngOnInit(): void {
     //A remplacer par le numero matricule de l'agent connecté
    this.matricule= 'agent1';
    this.getUtilisateurByMatricule(this.matricule);
    //this.getUtilisateurStructure()
    this.load();
    this.loadTypedemande();
    this.loadMotifAbsence();



  }

  isEditing() {
    return !!this.demande.id;
  }

  // getUtilisateurStructure(){
  //  this.structureService.getStructureById(this.authenticationService.getStructureId()).subscribe(
  //   (response)=>{
  //     this.structure=response.structure;
  //     this.structureAgent=this.structure.libelle;
  //   }
  //  )
  // }

  getUtilisateurByMatricule(matricule:string) {
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
             
            console.log("Retour get agent",this.agent);
            
            
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
  this.autorisationService.getAllSHI().subscribe(response => {
    this.isLoading = false;
    this.demandes = response.demandes;
    this.demandes.forEach(t => {
      let code:any=t.typeDemande?.code
      if(code.includes("CONG")){
        this.conges.push(t);
      }
    })

  }, error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
}

 

 
 
 //Traiter demande

 onTraiter(selection:any) {
  this.demande = Object.assign({}, selection);
  this.clearDialogMessages();
  this.treatDialog = true;
}

traiter(){

  this.clearDialogMessages();
  

  const data={
    numeroDemande:this.demande.numeroDemande,
    matriculeValidateur:this.agent.matricule,
    enumValidation:this.validation.enumValidation,
    avis:this.validation.avis,
    typeValidator:"SH"
  }
  console.log("data ", data)
  this.autorisationService.traiter(data).subscribe(response => {  
    // let index = this.demandes.findIndex(demande => demande.id === response.id);
    // this.demandes[index] = response;
    this.load()
    this.isDialogOpInProgress = false;
    this.treatDialog = false;
    this.showMessage({ severity: 'success', summary: 'Demande validée avec succès' });
  }, error => this.handleError(error));
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
