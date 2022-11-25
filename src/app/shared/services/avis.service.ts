import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllAvisResponse, Avis } from '../models/avis.model';

const avisUrl = environment.avisRessource;

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllAvisResponse> {
    //return this.http.get("assets/data/avis.json", { observe: 'response' })
    return this.http.get(avisUrl, { observe: 'response' })
    .pipe(map(response => {
        let avissResponse: GetAllAvisResponse = {
          aviss: response.body as Avis[]
        };
        return avissResponse;
      }));
  }

  create(avis: Avis): Observable<Avis> {
    return this.http.post(avisUrl, avis);
  }

  update(avis: Avis): Observable<Avis> {
    return this.http.put(avisUrl, avis);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${avisUrl}/${id}`);
  }
}
