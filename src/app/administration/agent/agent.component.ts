import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LazyLoadEvent, Message } from 'primeng/api';
import { Agent } from 'src/app/shared/models/agent.model';
import { ImportedService } from 'src/app/shared/services/imported.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = 1000;
  agents!: Agent[];
  agent: Agent= {};
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
    this.load();
  }

  importer(){
    console.log("eee")
    const formData: FormData = new FormData();
    const fichesAsJson: Blob = new Blob([JSON.stringify(this.file)], { type: 'application/xlsx' });
    formData.append('file', this.file);
    this.importationService.import(fichesAsJson).subscribe(response => {
      console.log("eee", fichesAsJson)
      this.load();
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'agent enregistré avec succès' });
    }, error => this.handleError(error));
  }
  onCreate() {
    
    this.showDialog = true;
  }

  onSelectFile(event:any): void {

    let file:File = event.files[0];
    this.file = file;
   
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.importationService.getAllAgent().subscribe(response => {
      this.isLoading = false;
      this.agents = response.agents;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
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

     // Errors

     handleError(error: HttpErrorResponse) {
      console.error(`Processing Error: ${JSON.stringify(error)}`);
      this.isDialogOpInProgress = false;
      this.dialogErrorMessage = error.error.title;
    }
}
