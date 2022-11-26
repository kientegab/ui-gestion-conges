import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { ArticleTypeDemande, GetAllArticleTypeDemandeResponse } from '../models/articleTypeDemande.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const articleTypeDemUrl = environment.articletypeDemandeRessource;


@Injectable({
  providedIn: 'root'
})
export class ArticleTypeDemandeService {
  constructor(private http: HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllArticleTypeDemandeResponse> {
    return this.http.get("assets/data/ministere.json", { observe: 'response' })
      // return this.http.get(ministereUrl, { observe: 'response' })
      .pipe(map(response => {
        let ministeresResponse: GetAllArticleTypeDemandeResponse = {
          articleTypeDemandes: response.body as ArticleTypeDemande[]
        };
        return ministeresResponse;
      }));
  }
}
