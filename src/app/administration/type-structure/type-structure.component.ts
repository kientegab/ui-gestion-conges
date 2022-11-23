import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';


import { environment } from 'src/environments/environment';
import { TypeStructureService } from '../../shared/services/type-structure.service';
import { TypeStructure } from '../../shared/models/typeStructure.model';

@Component({
  selector: 'app-type-structure',
  templateUrl: './type-structure.component.html',
  styleUrls: ['./type-structure.component.scss']
})
export class TypeStructureComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  typeStructures!: TypeStructure[];
  typeStructure: TypeStructure= {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  typeStructureDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private typeStructureService: TypeStructureService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.typeStructure.id;
  }
 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeStructureService.getAll().subscribe(response => {
      this.isLoading = false;
      this.typeStructures = response.typeStructures;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.typeStructure.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.typeStructure = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.typeStructureService.create(this.typeStructure).subscribe(response => {
      if (this.typeStructures.length !== this.recordsPerPage) {
        this.typeStructures.push(response);
        this.typeStructures = this.typeStructures.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Type Structure créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.typeStructure = Object.assign({}, selection);
    this.clearDialogMessages();
    this.typeStructureDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.typeStructure = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.typeStructureService.update(this.typeStructure).subscribe(response => {
        let index = this.typeStructures.findIndex(typeStructure => typeStructure.id === response.id);
        this.typeStructures[index] = response;
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
    this.typeStructureService.delete(selection.id).subscribe(() => {
      this.typeStructures = this.typeStructures.filter(typeStructure => typeStructure.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'typeStructure supprimé avec succès',
      });
    },(error) => this.handleError(error)
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
