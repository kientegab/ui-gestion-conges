import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Privilege } from 'src/app/shared/models/privilege';
import { PrivilegeService } from 'src/app/shared/services/privilege.service';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = 1000;
  privileges!: Privilege[];
  privilege: Privilege= {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete=true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  privilegeDetail: boolean=false;
  message: any;
  dialogErrorMessage: any;
  constructor(
    private confirmationService: ConfirmationService,
    private privilegeService : PrivilegeService
    ) { }

  ngOnInit(): void {
    
    this.load();

  }

  isEditing() {
    return !!this.privilege.id;
  }
 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.privilegeService.getAll().subscribe(response => {
      this.isLoading = false;
      this.privileges = response.privileges;

    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


  //Creation

  save() {
    if (this.privilege.id) {
      this.edit();
    } else {
      this.create();
    }
  }
  onCreate() {
    this.privilege = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.privilegeService.create(this.privilege).subscribe(response => {
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
    this.privilege = Object.assign({}, selection);
    this.clearDialogMessages();
    this.privilegeDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.privilege = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }


  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.privilegeService.update(this.privilege).subscribe(response => {
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
        message: 'Etes-vous sur de vouloir supprimer cet privilege?',
        accept: () => {
          this.delete(selection);
        }
      });
    }

    delete(selection: any) {
      this.isOpInProgress = true;
      this.privilegeService.delete(selection.id).subscribe(() => {
        this.privileges = this.privileges.filter(exemple => exemple.id !== selection.id);
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
