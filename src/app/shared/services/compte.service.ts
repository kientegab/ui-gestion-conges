import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compte, GetAllCompteResponse } from '../models/compte';
import { CompteSave } from '../models/compteSave.model';
import { CompteValidate, GetCompteValidateResponse } from '../models/compteValidate.model';
import { Structure } from '../models/structure.model';


const compteUrl= environment.compteRessource;
//const agentUrl=environment.agentResource;
//const activeCompteUrl= environment.activateResource;
//const structureUrl = environment.structureRessource;

@Injectable({
  providedIn: 'root'
})
export class CompteService {


  constructor(private http: HttpClient) { }
 /* getAll(event?: LazyLoadEvent): Observable<GetAllCompteResponse> {
    return this.http.get(compteUrl, { observe: 'response' })
    .pipe(map(response => {
        let comptesResponse: GetAllCompteResponse = {
          //totalCount: parseInt(response.headers.get(totalCountHeader)),
          comptes: response.body as Compte[]
        };
        return comptesResponse;
      }));
  }

  getComptebyMatricule(matricule: string): Observable<Compte> {

    return this.http.get<Compte>(`${compteUrl}agents/login/${matricule}`);

  }
*/
 /* getStructureById(id: number): Observable<any> {
    return this.http.get(`${structureUrl}/${id}`, { observe: 'response' })
    .pipe(map(response => {
      let value: Structure={};
      value= response.body as Structure;

      let data :Structure[]=[];
       data.push(value);
        return data;
      }));
    }*/


/*
getVerification(request: Compte): Observable<any> {
  return this.http.get(compteUrl + 'activate-agent', { observe: 'response' });
}

show(name: string): Observable<Profil> {
  return this.http.get<Profil>(`${profilUrl}/${name}`);
}*/
// getVerification(request: Compte): Observable<any> {
//   return this.http.get<any>(compteUrl+request);
// }
/*getVerification(request: Compte,event?: LazyLoadEvent): Observable<GetCompteValidateResponse> {
    return this.http.get(compteUrl+request, { observe: 'response' })
    .pipe(map(response => {
        let comptesValidateResponse: GetCompteValidateResponse = {
          //totalCount: parseInt(response.headers.get(totalCountHeader)),
          compteValidate: response.body as CompteValidate
        };
        return comptesValidateResponse;
      }));
  }*/

  getVerification(request: Compte): Observable<CompteValidate> {
    return this.http.post(compteUrl, request);
  }

  create(request: CompteSave): Observable<Compte> {
    return this.http.post(compteUrl+'register', request);
  }


 /* activeCompte(password: String, key:any): Observable<any> {
    return this.http.post(activeCompteUrl,{password,key});
  }*/


  /*update(compte: Compte): Observable<Compte> {
    return this.http.put(compteUrl, compte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${compteUrl}/${id}`);
  }*/


}



