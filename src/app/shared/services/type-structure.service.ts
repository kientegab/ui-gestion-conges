import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllTypeStructureResponse, TypeStructure } from '../models/typeStructure.model';

const Url = environment.typeStructureRessource;

@Injectable({
  providedIn: 'root'
})
export class TypeStructureService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllTypeStructureResponse> {
    return this.http.get("assets/data/typeStructure.json", { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let typeStructuresResponse: GetAllTypeStructureResponse = {
          typeStructures: response.body as TypeStructure[]
        };
        return typeStructuresResponse;
      }));
  }

  create(typeStructure: TypeStructure): Observable<TypeStructure> {
    return this.http.post(Url, typeStructure);
  }

  update(typeStructure: TypeStructure): Observable<TypeStructure> {
    return this.http.put(Url, typeStructure);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}
