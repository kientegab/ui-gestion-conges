import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExemple } from '../models/exemple.model';
import { environment } from 'src/environments/environment';


type EntityResponseType = HttpResponse<IExemple>;
type EntityArrayResponseType = HttpResponse<IExemple[]>;

@Injectable({ providedIn: 'root' })
export class ClasseService {

  public resourceUrl = environment.exempleResource;

  constructor(protected http: HttpClient) {}

  create(example: IExemple): Observable<EntityResponseType> {
    return this.http.post<IExemple>(this.resourceUrl, example, { observe: 'response' });
  }

  update(example: IExemple): Observable<EntityResponseType> {
    return this.http.put<IExemple>(this.resourceUrl, example, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExemple>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findListe(): Observable<EntityArrayResponseType> {
    return this.http.get<IExemple[]>(this.resourceUrl.concat('/liste'), { observe: 'response' });
  }
}
