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
  constructor(
    private importationService: ImportedService,
  ) { }

  ngOnInit(): void {
    this.load();
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

  onCreate() {
    this.agent = {};
    this.clearDialogMessages();
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
