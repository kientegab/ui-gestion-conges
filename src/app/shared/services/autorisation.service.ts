import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllDemandeResponse, Demande } from '../models/demande.model';

const Url = environment.demandeResource;
const structureUrl = environment.structureRessource;


@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllDemandeResponse> {
    return this.http.get("assets/data/demande.json", { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let demandesResponse: GetAllDemandeResponse = {
          demandes: response.body as Demande[]
        };
        return demandesResponse;
      }));
  }

  // getdemandeByMinistereId(id: number|null): Observable<GetAllDemandeResponse> {
  //   return this.http.get(`${structureUrl}/section/${id}`, { observe: 'response' })
  //   .pipe(map(response => {
  //       let demandesResponse: GetAllDemandeResponse = {
  //         demandes: response.body as Demande[]
  //       };
  //       return demandesResponse;
  //     }));
  // }


  create(demande: Demande): Observable<Demande> {
    return this.http.post(Url, demande);
  }

  update(demande: Demande): Observable<Demande> {
    return this.http.put(Url, demande);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}
