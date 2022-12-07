import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LazyLoadEvent, Message } from 'primeng/api';
import { Corps } from 'src/app/shared/models/corp.model';
import { ImportedService } from 'src/app/shared/services/imported.service';

@Component({
  selector: 'app-corps',
  templateUrl: './corps.component.html',
  styleUrls: ['./corps.component.scss']
})
export class CorpsComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = 1000;
  emplois!: Corps[];
  emploi: Corps= {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  articleDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  file: Blob | string = '';
  constructor(
    private importationService: ImportedService,
  ) { }

  ngOnInit(): void {
    this.load()
  }

   // Affichage

   load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.importationService.getAll().subscribe(response => {
      this.isLoading = false;
      this.emplois = response.corps;
      console.error("ppp", this.emplois)
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  onCreate() {
    
    this.showDialog = true;
  }

  onSelectFile(event:any): void {

    let file:File = event.files[0];
    this.file = file;
   
  }

  importer(){
    console.log("eee")
    const formData: FormData = new FormData();
    //const fichesAsJson: Blob = new Blob([JSON.stringify(this.file)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    formData.append('file', this.file);
    this.importationService.importEmplois(formData).subscribe(response => {
      console.log("eee", formData)
      this.load();
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'agent enregistré avec succès' });
    }, error => this.handleError(error));
  }
  // Messages
     // Errors

    handleError(error: HttpErrorResponse) {
      console.error(`Processing Error: ${JSON.stringify(error)}`);
      this.isDialogOpInProgress = false;
      this.dialogErrorMessage = error.error.title;
    }

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
