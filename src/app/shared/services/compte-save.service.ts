import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompteSave } from '../models/compteSave.model';

const compteSaveUrl= environment.compteSaveRessource;

@Injectable({
  providedIn: 'root'
})
export class CompteSaveService {

  constructor(private http: HttpClient) { }


  create(request: CompteSave): Observable<any> {
    return this.http.post(compteSaveUrl, request);
  }
}
