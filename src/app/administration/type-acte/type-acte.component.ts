import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LazyLoadEvent, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { TypeActe } from './../../shared/models/typeActe.model';
import { TypeActeService } from './../../shared/services/type-acte.service';

@Component({
  selector: 'app-type-acte',
  templateUrl: './type-acte.component.html',
  styleUrls: ['./type-acte.component.scss']
})
export class TypeActeComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  typeActe:TypeActe={};
  typeActes!: TypeActe[];
  
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
    private typeActeService: TypeActeService
  ) { }

  ngOnInit(): void {
    this.load();
  }


  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeActeService.getAll().subscribe(response => {
      this.isLoading = false;
      this.typeActes=response.typeActes;
  
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
  onCreate() {
    this.typeActe = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
    

  }
 

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
  const data={
    reference: "string",
    libelle: this.typeActe.libelle,
    templateUri: "string",
    porteActe: "INDIVIDUEL"
  }

    const formData: FormData = new FormData();
    formData.append('typeacte', JSON.stringify(data));
    formData.append("file", this.listFiles[0]);
    console.log('demande',data);
    console.log('formdata',formData);
    this.typeActeService.create(formData).subscribe(response => {
      this.load();
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'type enregistrée avec succès' });
    }, error => this.handleError(error));
  }
 
  //Creation
  save() {
    if (this.typeActe.id) {
      //this.edit();
    } else {
      this.create();
    }
  }

  isEditing() {
    return !!this.typeActe.id;
  }
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
