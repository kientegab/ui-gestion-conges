import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Ampliation, GetAllAmpliationResponse } from '../models/ampliation.model';
import { environment } from 'src/environments/environment';

const Url = environment.ampliationRessource;

@Injectable({
  providedIn: 'root'
})
export class AmpliationService {

  constructor(private http: HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllAmpliationResponse> {
    // return this.http.get("assets/data/ampliation.json", { observe: 'response' })
    return this.http.get(Url, { observe: 'response' })

      .pipe(map(response => {
        let ampliationsResponse: GetAllAmpliationResponse = {
          ampliations: response.body as Ampliation[]
        };
        return ampliationsResponse;
      }));
  }

  create(ampliation: Ampliation): Observable<Ampliation> {
    return this.http.post(Url, ampliation);
  }

  update(ampliation: Ampliation): Observable<Ampliation> {
    return this.http.put(Url, ampliation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}