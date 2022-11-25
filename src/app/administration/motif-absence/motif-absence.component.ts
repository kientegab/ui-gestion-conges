import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { MotifAbsence } from 'src/app/shared/models/motifAbsence.model';
import { MotifAbsenceService } from 'src/app/shared/services/motif-absence.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-motif-absence',
  templateUrl: './motif-absence.component.html',
  styleUrls: ['./motif-absence.component.scss']
})
export class MotifAbsenceComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  motifAbsences!: MotifAbsence[];
  motifAbsence: MotifAbsence = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  motifAbsenceDetail: boolean = false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private motifAbsenceService: MotifAbsenceService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.motifAbsence.id;
  }
  // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.motifAbsenceService.getAll().subscribe(response => {
      this.isLoading = false;
      this.motifAbsences = response.motifAbsences;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.motifAbsence.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.motifAbsence = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.motifAbsenceService.create(this.motifAbsence).subscribe(response => {
      if (this.motifAbsences.length !== this.recordsPerPage) {
        this.motifAbsences.push(response);
        this.motifAbsences = this.motifAbsences.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.motifAbsence = Object.assign({}, selection);
    this.clearDialogMessages();
    this.motifAbsenceDetail = true;
  }

  // Edit
  onEdit(selection: any) {
    this.motifAbsence = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.motifAbsenceService.update(this.motifAbsence).subscribe(response => {
      let index = this.motifAbsences.findIndex(motifAbsence => motifAbsence.id === response.id);
      this.motifAbsences[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure modifié avec succès' });
    }, error => this.handleError(error));
  }


  // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ce type Structure?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.motifAbsenceService.delete(selection.id).subscribe(() => {
      this.motifAbsences = this.motifAbsences.filter(motifAbsence => motifAbsence.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'motifAbsence supprimé avec succès',
      });
    }, (error) => this.handleError(error)
    );
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
