import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllTypeVisaResponse, TypeVisa } from '../models/typeVisa.model';

const typeVisaurl = environment.typeVisaRessource;

@Injectable({
  providedIn: 'root'
})
export class TypeVisaService {


  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllTypeVisaResponse> {
    return this.http.get("assets/data/typeVisa.json", { observe: 'response' })
    // return this.http.get(ministereUrl, { observe: 'response' })
    .pipe(map(response => {
        let typeVisaResponse: GetAllTypeVisaResponse = {
          typeVisas: response.body as TypeVisa[]
        };
        return typeVisaResponse;
      }));
  }


  create(typeVisa: TypeVisa): Observable<TypeVisa> {
    return this.http.post(typeVisaurl, typeVisa);
  }

  update(typeVisa: TypeVisa): Observable<TypeVisa> {
    return this.http.put(typeVisaurl, typeVisa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${typeVisaurl}/${id}`);
  }
}
