import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Compte } from 'src/app/shared/models/compte';
import { CompteSave } from 'src/app/shared/models/compteSave.model';
import { CompteValidate } from 'src/app/shared/models/compteValidate.model';
import { Privilege } from 'src/app/shared/models/privilege';
import { Profil } from 'src/app/shared/models/profil';
import { Structure } from 'src/app/shared/models/structure.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CompteSaveService } from 'src/app/shared/services/compte-save.service';
import { CompteService } from 'src/app/shared/services/compte.service';
import { PrivilegeService } from 'src/app/shared/services/privilege.service';
import { ProfilService } from 'src/app/shared/services/profil.service';
import { StructureService } from 'src/app/shared/services/structure.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  comptes!: Compte[];
  compte: Compte = {};
  compteValidates!: CompteValidate[];
  compteValidate: CompteValidate= {};

  compteSaves!: CompteSave[];
  compteSave: CompteSave= {};

  profils:Profil[]=[];
  profil: Profil={};
  privileges!:Privilege[];
  privilege:Privilege={};
  structures!:Structure[];
  strucure: Structure={};
  linearMode = true;
  suivant = false;
  showDialog = false;

  forme: any = {
    matricule: null,
    dateNaissance: null,
    dateRecrutement: null

  };


  formeSave: any = {
    matricule: null,
    email: null,
    matriculeResp: null,
    password: null,
    structure: null

  };
  verifForm!: FormGroup;

  verifFormSave!: FormGroup;


  enableCreate = true;
  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete = true;

  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  display=false;
  message: any;
  dialogErrorMessage: any;
  selectedProfil:any[]=[];
  cheked:boolean=false;
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  thirdForm!: FormGroup;
  fourForm!:FormGroup;
  isSuccessful: boolean = false;
  loading:  boolean=false;


  constructor(
    private compteService:CompteService,
    private profilService: ProfilService,
    private privilegeService: PrivilegeService,
    private structureService: StructureService,
    private compteSaveService: CompteSaveService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private router: Router,
    private authenticateService: AuthenticationService
    ) { }

    ngOnInit(): void {
      //this.load();
      //this.loadPermission();
      //this.loadProfil();
      //this.getStructByAgent();
      this.compteValidate.activate=false;
this.loadStructure();
      this.verifForm = this.fb.group({
        matricule: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        dateRecrutement: ['', Validators.required]

      });


      this.verifFormSave = this.fb.group({
        matricule: ['', Validators.required],
        email: ['', Validators.required],
        matriculeResp: ['', Validators.required],
        password: ['', Validators.required],
        structure: ['', Validators.required]



      });
    }


onFirstSubmit() {
  this.firstForm.markAsDirty();
}

onSecondSubmit() {
 this.secondForm.markAsDirty();
}

onThirdSubmit() {
  this.thirdForm.markAsDirty();
  this.create();
//  this.router.navigate(["/workspace/agent"])
}
onFourSubmit() {
  this.fourForm.markAsDirty();
 }

/*load(event?: LazyLoadEvent) {

  this.isLoading = true;
   this.compteService.getAll(event).subscribe(response => {
     this.isLoading = false;
       this.comptes = response.comptes;

   },   error => {
        this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }*/

 toggleLinearMode() {
  this.linearMode = !this.linearMode;
}



 loadProfil(event?: LazyLoadEvent) {
  this.isLoading = true;
   this.profilService.getAll(event).subscribe(response => {
     this.isLoading = false;
     this.profils = response.profils;
   }, error => {
     this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }






 loadPermission(event?: LazyLoadEvent) {
  this.isLoading = true;
   this.privilegeService.getAll(event).subscribe(response => {
     this.isLoading = false;
     this.privileges = response.privileges;

   }, error => {
     this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }

 loadStructure(event?: LazyLoadEvent) {
  this.isLoading = true;
  this.structureService.getAll(event).subscribe(
    (response) => {
      this.isLoading = false;
      this.structures = response.structures;
    },
    (error) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    }
  );
}


 save() {
   if (this.compte) {
    // this.edit();
   } else {
     this.create();
   }
 }

  //Creation

  onCreate() {
   this.compte = {};
   this.clearDialogMessages();
   this.form.resetForm();
   this.showDialog = true;
 }

//  create() {
//    this.loading=true;
//    this.clearDialogMessages();
//    this.isDialogOpInProgress = true;
//    let idStructure=this.authenticateService.getStructureId()!=  this.firstForm.value['structureId'].id ?
//    this.firstForm.value['structureId'].id : this.authenticateService.getStructureId();
//    const data = {
//     matricule: this.firstForm.value['matricule'],
//     nom: this.firstForm.value['nom'],
//     prenom: this.firstForm.value['prenom'],
//     telephone: this.firstForm.value['telephone'],
//     email: this.firstForm.value['email'],
//     password: this.firstForm.value['password'],
//     structureId: idStructure ,
//     profiles: this.selectedProfil,
//   };
//    this.compteService.create(data).subscribe(response => {
//     //this.isDialogOpInProgress = false;
//     this.isSuccessful=true;
//     this.loading = false;
//    },
//     error => this.handleError(error));
//     this.isSuccessful=false;
//     this.loading = false;
//  }

create() {
  this.clearDialogMessages();
  this.isDialogOpInProgress = true;
  this.compteSaveService.create(this.compteSave).subscribe(response => {
    if (this.compteSaves.length !== this.recordsPerPage) {
      this.compteSaves.push(response);
      this.compteSaves = this.compteSaves.slice();
    }
    this.totalRecords++;
    this.isDialogOpInProgress = false;
    this.showDialog = false;
    console.log("creation",response);
    this.showMessage({ severity: 'success', summary: 'Compte créée avec succès' });
  }, error => this.handleError(error));
}
showMessage(message: Message) {
  this.message = message;
  this.timeoutHandle = setTimeout(() => {
    this.message = null;
  }, 5000);
}
 onselectProfil(selection:any, event:any) {

 this.profil = Object.assign({}, selection);
 if (this.profil.id){
   this.cheked=true;
   const data= this.profil.name;
   this.selectedProfil.push(data);

 }
}
  // Edit

  onEdit(selection:any) {
   this.compte = Object.assign({}, selection);
   this.clearDialogMessages();
   this.showDialog = true;
 }

/* edit() {
   this.clearDialogMessages();
   this.isDialogOpInProgress = true;
   this.compteService.update(this.compte).subscribe(response => {
     let index = this.comptes.findIndex(agent => agent.id === response.id);
     this.comptes[index] = response;
     this.isDialogOpInProgress = false;
     this.showDialog = false;
     this.showMessage({ severity: 'success', summary: 'Compte modifié avec succès' });
   }, error => this.handleError(error));
 }*/

 isEditing() {
  // return !!this.compteSave.matricule;
  return false;
 }

 // Deletion

 /*onDelete(selection:any) {
   this.confirmationService.confirm({
     message: 'Etes-vous sur de vouloir supprimer cet agent?',
     accept: () => {
       this.delete(selection);
     }
   });
 }*/

 /*delete(selection:any) {
   this.isOpInProgress = true;
   this.compteService.delete(selection.id).subscribe(() => {
     this.comptes = this.comptes.filter(agent => agent.id !== selection.id);
     selection = null;
     this.isOpInProgress = false;
     this.totalRecords--;
     this.showMessage({ severity: 'success', summary: 'Compte supprimé avec succès' });
   }, error => this.handleError(error));
 }*/


 getStructureById(id:number){
 this.structureService.getStructureById(id).subscribe(response => {

   this.structures = response;
 }, error => {
   this.message = { severity: 'error', summary: error.error };
   console.error(JSON.stringify(error));
 });
 }

 getStructByAgent(){
   if(this.authenticateService.checkPermission(this.authenticateService.getPrivilege()!, ['ROLE_ADMIN']) == true){
     this.loadStructure();
   }
   else{
     this.getStructureById(this.authenticateService.getStructureId());
   }
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

/* showMessage(message: Message) {
   this.message = message;
   this.timeoutHandle = setTimeout(() => {
     this.message = null;
   }, 5000);

 }*/

 /*onPrivilege(name: string) {
  this.profilService.show(name).subscribe(data => {
   this.profil = Object.assign({}, data as Profil);
  });
  this.clearDialogMessages();
  this.showDialogPrivilege = true;
}*/

onSubmite(){
  this.compteSave = this.formeSave;

  console.log("login save",this.compteSave);
  if (this.verifFormSave.invalid) {
    return;
  }
  this.loading = true;

  // this.compteService.getVerification(this.compte).subscribe(
  //   data => {

  //     this.loading = false;
  //    // this.profil = Object.assign({}, data as Profil);
  //    console.log("dataaaaaaaaa",data);

  //     this.router.navigateByUrl('/profile');
  //   },


  this.compteSaveService.create(this.compteSave).subscribe(response => {
    //this.isDialogOpInProgress = false;
    this.isSuccessful=true;
    this.loading = false;
    this.compteValidate=response
    console.log("compte creer avec succes",response);
    //  this.router.navigateByUrl('/compte');

    this.showMessage({ severity: 'success', summary: 'Compte créée avec succès' });


   },
    error => {
      this.loading = false;
      this.handleError(error)
      this.message = { severity: 'error', summary: this.dialogErrorMessage };
      console.error(JSON.stringify(error));
    }
  );





}
onSubmit(){
    this.compte = this.forme;

    console.log("login",this.compte);
    if (this.verifForm.invalid) {
      return;
    }
    this.loading = true;

    // this.compteService.getVerification(this.compte).subscribe(
    //   data => {

    //     this.loading = false;
    //    // this.profil = Object.assign({}, data as Profil);
    //    console.log("dataaaaaaaaa",data);

    //     this.router.navigateByUrl('/profile');
    //   },


    this.compteService.getVerification(this.compte).subscribe(response => {
      //this.isDialogOpInProgress = false;
      this.isSuccessful=true;
      this.loading = false;
      this.compteValidate=response
      console.log("Verification OK",response);

     },
      error => {
        this.loading = false;
        this.handleError(error)
        this.message = { severity: 'error', summary: this.dialogErrorMessage };
        console.error(JSON.stringify(error));
      }
    );





  }
}
