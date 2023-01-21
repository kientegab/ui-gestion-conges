import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Acte } from 'src/app/shared/models/acte.model';
import { Agent } from 'src/app/shared/models/agent.model';
import { Demande } from 'src/app/shared/models/demande.model';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
import { ActeService } from 'src/app/shared/services/acte.service';
import { AutorisationService } from 'src/app/shared/services/autorisation.service';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { TypeDemandeService } from 'src/app/shared/services/type-demande.service';
import { environment } from 'src/environments/environment';
import { TypeActeService } from './../../../shared/services/type-acte.service';
import { TypeActe } from './../../../shared/models/typeActe.model';

@Component({
  selector: 'app-acte-autorisations',
  templateUrl: './acte-autorisations.component.html',
  styleUrls: ['./acte-autorisations.component.scss']
})
export class ActeAutorisationsComponent implements OnInit {

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
  agent:Agent={};
  motifAbsences!: MotifAbsence[];
  motifAbsence: MotifAbsence={};
  autorisations:Demande[]=[];
  typeActe: TypeActe={};
  typeActes: TypeActe[]=[];
  acte: Acte={};
  actes: Acte[]=[];
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  enableBtnTreat=true;
  enableBtnDownload=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  demandeDetail: boolean=false;
  treatDialog!:boolean;
  message: any;
  dialogErrorMessage: any;
  

  
  constructor(
    private autorisationService: AutorisationService ,
    private acteService: ActeService,
    private typeActeService: TypeActeService,
    private typeDemandeService: TypeDemandeService,
    private motifAbsenceService: MotifAbsenceService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadTypeActe();
    this.loadTypeDemande();
    this.loadDemande()
   

  }

  

 loadTypeActe(){

   this.typeActeService.getAll().subscribe(response =>{
    this.typeActes=response.typeActes;
    console.log("ttttttttttt", this.typeActes)
   })
 }

 loadTypeDemande(){

  this.typeDemandeService.getAll().subscribe(response =>{
   this.typeDemandes=response.typeDemandes;
   console.log("pp", this.typeDemandes)
  })
}

loadDemande(event?: LazyLoadEvent) {
  this.isLoading = true;
  this.autorisationService.getAllSHI().subscribe(response => {
    this.isLoading = false;
    this.demandes = response.demandes;
    // this.demandes.forEach(t => {
    //   let typeDemande:any=t.typeDemande?.code
    //   if(typeDemande.includes("JOUIS") || typeDemande.includes("AUTRE")){
    //     this.autorisations.push(t);
       
    //   }
      
    // })

    console.log("dd", this.demandes);
  }, error => {
    this.message = { severity: 'error', summary: error.error };
    console.error(JSON.stringify(error));
  });
}


 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.acteService.getAll().subscribe(response => {
      this.isLoading = false;
      this.actes = response.actes;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
 
  onDownload(selection: any){
    let fileUrl;
    this.acteService.download(selection.reference).subscribe(blob =>  {
      fileUrl = window.URL.createObjectURL(blob);
      window.open(fileUrl);
       console.error("url", fileUrl);
       this.showMessage({ severity: 'success', summary: 'acte téléchargé avec succès' });
    });

   }
    create() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      const data={
        reference: "2022_0005",
        enteteMinistere: "Ministere de la Transisiton Digital",
        status: "INITIATION",
        ampliation: "1 SG \n 1 DRH \n 2. personnes",
        annee: "2022",
        nomPrenomCreator: "Moumine Arthur OUEDRAOGO",
        titreCreator: "Ingenieur des Travaux Informatique",
        typeActe: {
          "reference": "string"
        },
        demandes :[
          { 
          numeroDemande: "STRUC - TEST0000"
          }
        ]
      }
    
      this.acteService.create(data).subscribe(response => {
        this.load();
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({severity: 'success', summary: 'acte enregistré avec succès'});
      }, error => this.handleError(error));
    }

  onCreate() {
    this.acte = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;

  }

  //Creation
  save() {
    if (this.acte.id) {
      //this.edit();
    } else {
      this.create();
    }
  }

  isEditing() {
    return !!this.acte.id;
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
