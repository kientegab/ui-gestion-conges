import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { Exemple, IExemple } from 'src/app/shared/models/exemple.model';
import { ClasseService } from 'src/app/shared/services/exemple.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = 1000;
  exemples!: Exemple[];
  exemple: Exemple= {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  exempleDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private confirmationService: ConfirmationService,
    private exempleService: ClasseService,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.exemple.id;
  }
 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.exempleService.getAll().subscribe(response => {
      this.isLoading = false;
      this.exemples = response.exemples;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.exemple.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.exemple = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.exempleService.create(this.exemple).subscribe(response => {
      // if (this.exemples.length !== this.recordsPerPage) {
      //   this.exemples.push(response);
      //   this.exemples = this.exemples.slice();
      // }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'exemple créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.exemple = Object.assign({}, selection);
    this.clearDialogMessages();
    this.exempleDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.exemple = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.exempleService.update(this.exemple).subscribe(response => {
        // let index = this.exemples.findIndex(exemple => exemple.id === response.id);
        // this.exemples[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'exemple modifié avec succès' });
      }, error => this.handleError(error));
    }


    // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer cet exemple?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.exempleService.delete(selection.id).subscribe(() => {
      this.exemples = this.exemples.filter(exemple => exemple.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Exemple supprimé avec succès',
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
