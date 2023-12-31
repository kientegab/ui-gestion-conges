import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllTypeDemandeResponse, TypeDemande } from '../models/typeDemande.model';

const typeDemandeUrl = environment.typeDemandeRessource;

@Injectable({
  providedIn: 'root'
})
export class TypeDemandeService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllTypeDemandeResponse> {
    return this.http.get(typeDemandeUrl, { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let typeDemandesResponse: GetAllTypeDemandeResponse = {
          typeDemandes: response.body as TypeDemande[]
        };
        return typeDemandesResponse;
      }));
  }

  getAllAutorisation(event?: LazyLoadEvent): Observable<GetAllTypeDemandeResponse> {
    // return this.http.get(typeDemandeUrl, { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    return this.http.get("assets/data/typeDemande.json", { observe: 'response' })
    .pipe(map(response => {
        let typeDemandesResponse: GetAllTypeDemandeResponse = {
          typeDemandes: response.body as TypeDemande[]
        };
        return typeDemandesResponse;
      }));
  }

  create(typeDemande: TypeDemande): Observable<TypeDemande> {
    return this.http.post(typeDemandeUrl, typeDemande);
  }

  update(typeDemande: TypeDemande): Observable<TypeDemande> {
    return this.http.put(typeDemandeUrl, typeDemande);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${typeDemandeUrl}/${id}`);
  }
}
