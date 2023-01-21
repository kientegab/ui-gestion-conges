import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllTypeActeResponse, TypeActe } from './../models/typeActe.model';
const Url = environment.typeActeRessource;


@Injectable({
  providedIn: 'root'
})
export class TypeActeService {

  constructor(private http:HttpClient) { }
 

  getAll(event?: LazyLoadEvent): Observable<GetAllTypeActeResponse> {
    return this.http.get(Url, { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let typeActesResponse: GetAllTypeActeResponse = {
          typeActes: response.body as TypeActe[]
        };
        return typeActesResponse;
      }));
  }
  create(request: any): Observable<TypeActe> {
    return this.http.post(Url, request);
  }
}
