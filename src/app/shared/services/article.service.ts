import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, GetAllArticleResponse } from '../models/article.model';
const Url = environment.avisRessource;

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllArticleResponse> {
    return this.http.get("assets/data/avis.json", { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let articleResponse: GetAllArticleResponse = {
          articles: response.body as Article[]
        };
        return articleResponse;
      }));
  }
  create(avis: Article): Observable<Article> {
    return this.http.post(Url, avis);
  }

  update(avis: Article): Observable<Article> {
    return this.http.put(Url, avis);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}
