import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Privilege } from 'src/app/shared/models/privilege';
import { Profil } from 'src/app/shared/models/profil';
import { PrivilegeService } from 'src/app/shared/services/privilege.service';
import { ProfilService } from 'src/app/shared/services/profil.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {


  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  profils!: Profil[];
  privileges!:Privilege[];
  profil: Profil = {};
  enableCreate = true;
  enableBtnInfo = false;
  enableBtnEdit = true;
  enableBtnDelete = false;
  enableBtnPrivilege = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  showDialogPrivilege =false;
  message: any;
  dialogErrorMessage: any;
  permissions:any;

  constructor(
    private profilService: ProfilService,
    private confirmationservice: ConfirmationService,
    private privilegeService: PrivilegeService,
  ) { }

  ngOnInit(): void {

   this.load();
    //this.loadPrivilege();

  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.profilService.getAll(event).subscribe(
      (response) => {
        this.isLoading = false;
        this.profils = response.profils;
      },
      (error) => {
        this.message = { severity: 'error', summary: error.error };
        console.error(JSON.stringify(error));
      }
    );
  }


  onInfo(selection: any) {
    this.profil = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }
  onEdit(selection: any) {
    this.profil = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }
  onDelete(selection: any) {
    this.confirmationservice.confirm({
      message: 'Etes-vous sûre de vouloir supprimer ce profil?',
      accept: () => {
        this.delete(selection);
      },
    });
  }

  onCreate() {
    this.profil = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  isEditing() {
    return !!this.profil.id;
  }
  save() {
    if (this.profil.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.profilService.create(this.profil).subscribe(
      (response) => {
        if (this.profils.length !== this.recordsPerPage) {
          this.profils.push(response);
          this.profils = this.profils.slice();
        }
        this.totalRecords++;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({
          severity: 'success',
          summary: 'Profil créé avec succes',
        });
      },
      (error) => this.handleError(error)
    );
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.profilService.update(this.profil).subscribe(
      (response) => {
        let index = this.profils.findIndex(
          (profil) => profil.id === response.id
        );
        this.profils[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({
          severity: 'success',
          summary: 'Profil modifié avec succès',
        });
      },
      (error) => this.handleError(error)
    );
  }


  delete(selection: any) {
    this.isOpInProgress = true;
    this.profilService.delete(selection.id).subscribe(
      () => {
        this.profils = this.profils.filter(
          (profil) => profil.id !== selection.id
        );
        selection = null;
        this.isOpInProgress = false;
        this.totalRecords--;
        this.showMessage({
          severity: 'success',
          summary: 'profil supprimé avec succès',
        });
      },
      (error) => {
        console.error(JSON.stringify(error));
        this.isOpInProgress = false;
        this.showMessage({ severity: 'error', summary: error.error.message });
      }
    );
  }

  loadPrivilege(event?: LazyLoadEvent) {
    this.privilegeService.getAll(event).subscribe(response => {
      this.privileges = response.privileges;
    });
  }

  onPrivilege(name: string) {
    this.profilService.show(name).subscribe(data => {
     this.profil = Object.assign({}, data as Profil);
    });
    this.clearDialogMessages();
    this.showDialogPrivilege = true;
  }


  privilege(){

    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.profilService.update(this.profil).subscribe(response => {
      this.isDialogOpInProgress = false;
      this.showDialogPrivilege =  false;
      this.showMessage({ severity: 'success', summary: 'Privilèges modifiés avec succès' });
    },error => this.handleError(error));
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

  // Errors

  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }
}


