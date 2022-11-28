import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllDemandeResponse, Demande, Utilisateur, GetUtilisateurResponse } from '../models/demande.model';

const Url = environment.demandeResource;
const utilisateurUrl = environment.utilisateurRessource;


@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllDemandeResponse> {
    // return this.http.get("assets/data/demande.json", { observe: 'response' })
    return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let demandesResponse: GetAllDemandeResponse = {
          demandes: response.body as Demande[]
        };
        return demandesResponse;
      }));
  }

  getUtilisateurByMatricule(matricule: string): Observable<GetUtilisateurResponse> {
    return this.http.get(`${utilisateurUrl}?matricule=${matricule}`, { observe: 'response' })
    .pipe(map(response => {
        let utilisateurResponse: GetUtilisateurResponse = {
          utilisateur: response.body as Utilisateur
        };
        return utilisateurResponse;
      }));
  }


  create(request: any): Observable<Demande> {
    return this.http.post(Url, request);
  }

  update(request: any): Observable<Demande> {
    return this.http.put(Url, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}
