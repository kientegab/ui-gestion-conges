import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Agent } from 'src/app/shared/models/agent.model';
import { Demande, Utilisateur } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';

import { Validation } from 'src/app/shared/models/validation.model';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { environment } from 'src/environments/environment';


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
  matricule!:string;
  demandes!:Demande[];
  demande:Demande= {};
  ministeres!: Ministere[];
  typeDemandes!:TypeDemande[];
  typedemande:TypeDemande={};
  validation:Validation={};
  agent:Agent={};
  motifAbsences!: MotifAbsence[];
  motifAbsence: MotifAbsence={};
  autorisations:Demande[]=[];
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  enableBtnTreat=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  demandeDetail: boolean=false;
  file: Blob | string = '';
  files: Blob | string ='';
  treatDialog!:boolean;
  message: any;
  dialogErrorMessage: any;
  
  avisOptions:any[]=[{"libelle":"APPROUVEE", "valeur":"APPROVED"},
                      {"libelle":"REJETEE","valeur":"REJECTED"}]
  
  constructor(
    private autorisationService: AutorisationService ,
    private typeDemandeService: TypeDemandeService,
    private motifAbsenceService: MotifAbsenceService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadMotifAbsence();
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




 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.autorisationService.getAllSHI().subscribe(response => {
      this.isLoading = false;
      this.demandes = response.demandes;
      this.demandes.forEach(t => {
        let code:any=t.typeDemande?.code
        if(code.includes("JOUIS") || code.includes("AUTRE")){
          this.autorisations.push(t);
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
