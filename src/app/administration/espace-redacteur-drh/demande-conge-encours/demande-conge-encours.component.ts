import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Agent } from 'src/app/shared/models/agent.model';
import { Demande } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { Validation } from 'src/app/shared/models/validation.model';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { environment } from 'src/environments/environment';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DecisionCongeService } from './../../../shared/services/decision-conge.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Authentication } from 'src/app/shared/models/authentication.model';


@Component({
  selector: 'app-demande-conge-encours',
  templateUrl: './demande-conge-encours.component.html',
  styleUrls: ['./demande-conge-encours.component.scss']
})
export class DemandeCongeEncoursComponent implements OnInit {

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
  validation:Validation={};
  agent:Agent={};
  shi:Agent={};
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
  treatDialog!:boolean;
  message: any;
  dialogErrorMessage: any; 
  avisOptions:any[]=[{"libelle":"APPROUVEE", "valeur":"APPROVED"},
                      {"libelle":"REJETEE","valeur":"REJECTED"}]
  constructor(
    private decisionCongeService: DecisionCongeService,
    private autorisationService:AutorisationService,
    private typeDemandeService: TypeDemandeService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load()
      //A remplacer par le numero matricule de l'agent connecté
      this.matricule= 'agent1';
      this.getUtilisateurByMatricule(this.matricule);
  }

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
      typeValidator:"DRH"
    }
    console.log("data ", data)
    this.decisionCongeService.traiter(data).subscribe(response => {
      let index = this.demandes.findIndex(demande => demande.id === response.id);
      this.demandes[index] = response;
      this.isDialogOpInProgress = false;
      this.treatDialog = false;
      this.showMessage({ severity: 'success', summary: 'Demande validée avec succès' });
    }, error => this.handleError(error));
  }
 
  // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.autorisationService.getAllDRH().subscribe(response => {
      this.isLoading = false;
      this.demandes = response.demandes;
      this.demandes.forEach(t => {
        let typeDemande:any=t.typeDemande?.libelle;
        let position:any=t.positionDemande;
        if(typeDemande.includes("CONG") && position=="SH"){
          this.autorisations.push(t);
        }
      })

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
//Détail
onInfo(selection: any) {
  this.demande = Object.assign({}, selection);
  this.clearDialogMessages();
  this.demandeDetail=true;
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
