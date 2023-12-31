import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllModalPaiementResponse, ModalPaiement } from '../models/modalPaiement.model';

const modalPaiementUrl = environment.modalPaiementRessource;

@Injectable({
  providedIn: 'root'
})
export class ModalPaiementService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllModalPaiementResponse> {
    //return this.http.get("assets/data/modalPaiement.json", { observe: 'response' })
    return this.http.get(modalPaiementUrl, { observe: 'response' })
    .pipe(map(response => {
        let modalpaiementsResponse: GetAllModalPaiementResponse = {
          modalPaiements: response.body as ModalPaiement[]
        };
        return modalpaiementsResponse;
      }));
  }

  create(modalpaiement: ModalPaiement): Observable<ModalPaiement> {
    return this.http.post(modalPaiementUrl, modalpaiement);
  }

  update(modalpaiement: ModalPaiement): Observable<ModalPaiement> {
    return this.http.put(modalPaiementUrl, modalpaiement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${modalPaiementUrl}/${id}`);
  }
}
