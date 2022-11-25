import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllStructureResponse, Structure } from '../models/structure.model';

const Url = environment.structureRessource;
const structureUrl = environment.structureRessource;

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllStructureResponse> {
    return this.http.get("assets/data/structure.json", { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let structuresResponse: GetAllStructureResponse = {
          structures: response.body as Structure[]
        };
        return structuresResponse;
      }));
  }

  getStructureById(id: number): Observable<any> {
    return this.http.get(`${structureUrl}/${id}`, { observe: 'response' })
    .pipe(map(response => {
      let value: Structure={};
      value= response.body as Structure;

      let data :Structure[]=[];
       data.push(value);
        return data;
      }));
    }

  create(structure: Structure): Observable<Structure> {
    return this.http.post(Url, structure);
  }

  update(structure: Structure): Observable<Structure> {
    return this.http.put(Url, structure);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Url}/${id}`);
  }
}
