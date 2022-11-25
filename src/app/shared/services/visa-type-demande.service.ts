import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllVisaTypeDemandeResponse, VisaTypeDemande } from '../models/visaTypeDemande.model';

const visaTypeDemandeurl = environment.visatypedemandeesource;

@Injectable({
  providedIn: 'root'
})
export class VisaTYpeDemandeService {



  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllVisaTypeDemandeResponse> {
    return this.http.get("assets/data/ministere.json", { observe: 'response' })
    // return this.http.get(ministereUrl, { observe: 'response' })
    .pipe(map(response => {
        let ministeresResponse: GetAllVisaTypeDemandeResponse = {
          visaTypeDemandes: response.body as VisaTypeDemande[]
        };
        return ministeresResponse;
      }));
  }

/*  create(visaType: VisaTypeDemande): Observable<VisaTypeDemande> {
    return this.http.post(visaTypeDemandeurl, visaType);
  }

  update(ministere: Ministere): Observable<Ministere> {
    return this.http.put(ministereUrl, ministere);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ministereUrl}/${id}`);
  }  */


}


