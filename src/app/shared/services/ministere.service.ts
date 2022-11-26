import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllMinistereResponse, Ministere } from '../models/ministere.model';

const ministereUrl = environment.ministereRessource;

@Injectable({
  providedIn: 'root'
})
export class MinistereService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllMinistereResponse> {
    return this.http.get(ministereUrl, { observe: 'response' })
    // return this.http.get(ministereUrl, { observe: 'response' })
    .pipe(map(response => {
        let ministeresResponse: GetAllMinistereResponse = {
          ministeres: response.body as Ministere[]
        };
        return ministeresResponse;
      }));
  }

  create(ministere: Ministere): Observable<Ministere> {
    return this.http.post(ministereUrl, ministere);
  }

  update(ministere: Ministere): Observable<Ministere> {
    return this.http.put(ministereUrl, ministere);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ministereUrl}/${id}`);
  }
}
