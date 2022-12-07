import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllVisaResponse, Visa } from '../models/visa.model';

const Url = environment.visaRessource;

@Injectable({
  providedIn: 'root'
})
export class VisaService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllVisaResponse> {
    // return this.http.get("assets/data/visa.json", { observe: 'response' })
    return this.http.get(Url, { observe: 'response' })
      
    .pipe(map(response => {
        let visasResponse: GetAllVisaResponse = {
          visas: response.body as Visa[]
        };
        return visasResponse;
      }));
  }

  create(visa: Visa): Observable<Visa> {
    return this.http.post(Url, visa);
  }

  update(visa: Visa): Observable<Visa> {
    return this.http.put(Url, visa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}
