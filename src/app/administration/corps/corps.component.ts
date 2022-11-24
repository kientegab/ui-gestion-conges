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
    this.emploi = {};
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
