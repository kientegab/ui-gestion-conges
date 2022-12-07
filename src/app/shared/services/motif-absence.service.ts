import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllMotifAbsenceResponse, MotifAbsence } from '../models/motifAbsence.model';

const motifAbsenceUrl = environment.motifAbsenceRessource;

@Injectable({
  providedIn: 'root'
})
export class MotifAbsenceService {

  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllMotifAbsenceResponse> {
    //return this.http.get("assets/data/motifAbsence.json", { observe: 'response' })
    return this.http.get(motifAbsenceUrl, { observe: 'response' })
    .pipe(map(response => {
        let motifabsencesResponse: GetAllMotifAbsenceResponse = {
          motifAbsences: response.body as MotifAbsence[]
        };
        return motifabsencesResponse;
      }));
  }

  create(motifabsence: MotifAbsence): Observable<MotifAbsence> {
    return this.http.post(motifAbsenceUrl, motifabsence);
  }

  update(motifabsence: MotifAbsence): Observable<MotifAbsence> {
    return this.http.put(motifAbsenceUrl, motifabsence);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${motifAbsenceUrl}/${id}`);
  }
}
