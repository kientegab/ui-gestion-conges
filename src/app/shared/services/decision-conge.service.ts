import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from '../models/demande.model';
const Url = environment.demandeResource;


@Injectable({
  providedIn: 'root'
})
export class DecisionCongeService {

  constructor( private http:HttpClient) { }

  traiter(request: any): Observable<Demande>{
    return this.http.post(Url+'/validation_sg/true', request);
   }
}
