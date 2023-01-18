import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllDemandeResponse, Demande, Utilisateur, GetUtilisateurResponse } from '../models/demande.model';
import { Agent, GetAgentResponse } from '../models/agent.model';
import { Validation } from './../models/validation.model';

const Url = environment.demandeResource;
const agentUrl = environment.agentResource;


@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllDemandeResponse> {
    //  return this.http.get("assets/data/demande.json", { observe: 'response' })
    return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let demandesResponse: GetAllDemandeResponse = {
          demandes: response.body as Demande[]
        };
        return demandesResponse;
      }));
  }
  getAllSHI(event?: LazyLoadEvent): Observable<GetAllDemandeResponse> {
    return this.http.get(Url, { observe: 'response' })
   //return this.http.get(Url, { observe: 'response' })
   .pipe(map(response => {
       let demandesResponse: GetAllDemandeResponse = {
         demandes: response.body as Demande[]
       };
       return demandesResponse;
     }));
 }
 getAllDRH(event?: LazyLoadEvent): Observable<GetAllDemandeResponse> {
  //return this.http.get("assets/data/demandeSRH.json", { observe: 'response' })
   return this.http.get(Url, { observe: 'response' })
 .pipe(map(response => {
     let demandesResponse: GetAllDemandeResponse = {
       demandes: response.body as Demande[]
     };
     return demandesResponse;
   }));
}

 getAllSRH(event?: LazyLoadEvent): Observable<GetAllDemandeResponse> {
  //return this.http.get("assets/data/demandeSRH.json", { observe: 'response' })
   return this.http.get(Url, { observe: 'response' })
 .pipe(map(response => {
     let demandesResponse: GetAllDemandeResponse = {
       demandes: response.body as Demande[]
     };
     return demandesResponse;
   }));
}

  getUtilisateurByMatricule(matricule: any): Observable<GetAgentResponse> {
    return this.http.get(`${agentUrl}/login/${matricule}`, { observe: 'response' })
    .pipe(map(response => {
        let agentResponse: GetAgentResponse = {
          agent: response.body as Agent
        };
        return agentResponse;
      }));
  }

 traiter(request: any): Observable<Demande>{
  return this.http.post(Url+'/validation_sh/true', request);
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
