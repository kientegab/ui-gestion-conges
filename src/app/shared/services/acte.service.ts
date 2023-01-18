import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acte, GetAllActeResponse } from '../models/acte.model';
const Url = environment.acteRessource;

@Injectable({
  providedIn: 'root'
})
export class ActeService {

  constructor(private http:HttpClient) { }
 

  getAll(event?: LazyLoadEvent): Observable<GetAllActeResponse> {
    return this.http.get(Url, { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let structuresResponse: GetAllActeResponse = {
          actes: response.body as Acte[]
        };
        return structuresResponse;
      }));
  }

  create(request: any): Observable<Acte> {
    return this.http.post(Url, request);
  }
  download(referenceActe:string):Observable<Blob>
  {
    return this.http.get(Url+'/generate_acte/'+referenceActe,{responseType: 'blob'});
  }
}
