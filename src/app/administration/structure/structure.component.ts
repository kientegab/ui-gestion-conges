import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { Ministere } from 'src/app/shared/models/ministere.model';
import { Structure } from 'src/app/shared/models/structure.model';
import { TypeStructure } from 'src/app/shared/models/typeStructure.model';
import { MinistereService } from 'src/app/shared/services/ministere.service';
import { StructureService } from 'src/app/shared/services/structure.service';
import { TypeStructureService } from 'src/app/shared/services/type-structure.service';


import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  structures!: Structure[];
  ministereStructures!: Structure[];
  structure: Structure= {};
  ministeres!: Ministere[];
  typeStructures!: TypeStructure[];
  type: TypeStructure={};


  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  structureDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private structureService: StructureService,
    private typeStructureService: TypeStructureService,
    private ministereService: MinistereService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.load();
    this.loadTypeStructure();
    this.loadMinisteres();
  }

  isEditing() {
    return !!this.structure.id;
  }

  loadMinisteres(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.ministereService.getAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.ministeres = response.ministeres;
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }

  loadTypeStructure(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.typeStructureService.getAll().subscribe(
      (response) => {
        this.isLoading = false;
        this.typeStructures = response.typeStructures;

        console.log("type structure", this.typeStructures);
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }

  onSelectMinistere(){
  //  console.log("on select"+this.structure.ministere);
    if(this.structure.ministere)
    {
      this.getMinistereStructures();
    }
  }

  //Liste des structutes d'un ministere
  getMinistereStructures(event?: any) {
    let ministereId = this.structure.ministere?.id;
    // console.log("get ministere struct"+this.structure.ministere);
    // console.log("id",ministereId);
    this.isLoading = true;
    this.structureService.getStructureByMinistereId(ministereId?ministereId:null).subscribe(
      (response) => {
        this.isLoading = false;
        this.ministereStructures = response.structures;
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
      }
    );
  }

 // Affichage

  load(event?: LazyLoadEvent) {
    // this.isLoading = true;
    this.structureService.getAll().subscribe(response => {
      this.isLoading = false;
      this.structures = response.structures;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.structure.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.structure = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    console.log("aaaa", this.structure);
    this.structureService.create(this.structure).subscribe(response => {
      if (this.structures.length !== this.recordsPerPage) {
        this.structures.push(response);
        this.structures = this.structures.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Structure créée avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.structure = Object.assign({}, selection);
    this.clearDialogMessages();
    this.structureDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.structure = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.structureService.update(this.structure).subscribe(response => {
        let index = this.structures.findIndex(structure => structure.id === response.id);
        this.structures[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'Structure modifiée avec succès' });
      }, error => this.handleError(error));
    }


    // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer cette  Structure?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.structureService.delete(selection.id).subscribe(() => {
      this.structures = this.structures.filter(structure => structure.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Structure supprimée avec succès',
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
