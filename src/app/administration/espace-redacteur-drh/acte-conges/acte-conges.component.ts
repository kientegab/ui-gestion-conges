import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-acte-conges',
  templateUrl: './acte-conges.component.html',
  styleUrls: ['./acte-conges.component.scss']
})
export class ActeCongesComponent implements OnInit {
  
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
  enableBtnTreat=true;
  message: any;
  dialogErrorMessage: any;
  treatDialog:boolean=false;
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
    this.load();
    this.loadTypedemande();
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

//Détail
onInfo(selection: any) {
  this.demande = Object.assign({}, selection);
  this.clearDialogMessages();
  this.demandeDetail=true;
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
