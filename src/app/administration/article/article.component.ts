import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { Article } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;
  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = 1000;
  articles!: Article[];
  article: Article= {};
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
    private confirmationService: ConfirmationService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  isEditing() {
    return !!this.article.id;
  }
 // Affichage

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.articleService.getAll().subscribe(response => {
      this.isLoading = false;
      this.articles = response.articles;
      console.log("articles", this.articles);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  //Creation

  save() {
    if (this.article.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  onCreate() {
    this.article = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }

  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.articleService.create(this.article).subscribe(response => {
      if (this.articles.length !== this.recordsPerPage) {
        this.articles.push(response);
        this.articles = this.articles.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'article créé avec succès' });
    }, error => this.handleError(error));
  }

  //Détail
  onInfo(selection: any) {
    this.article = Object.assign({}, selection);
    this.clearDialogMessages();
    this.articleDetail=true;
  }

    // Edit
    onEdit(selection: any) {
      this.article = Object.assign({}, selection);
      this.clearDialogMessages();
      this.showDialog = true;
    }

    edit() {
      this.clearDialogMessages();
      this.isDialogOpInProgress = true;
      this.articleService.update(this.article).subscribe(response => {
        let index = this.articles.findIndex(article => article.id === response.id);
        this.articles[index] = response;
        this.isDialogOpInProgress = false;
        this.showDialog = false;
        this.showMessage({ severity: 'success', summary: 'article modifié avec succès' });
      }, error => this.handleError(error));
    }


    // Deletion
  onDelete(selection: any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer cet article?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection: any) {
    this.isOpInProgress = true;
    this.articleService.delete(selection.id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({
        severity: 'success',
        summary: 'Article supprimé avec succès',
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
