import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agent, GetAllAgentResponse } from '../models/agent.model';
import { Article } from '../models/article.model';
import { Corps, GetAllCorpsResponse } from '../models/corp.model';
const agentUrl= environment.agentRessource;
const corpUrl= environment.corpRessource;
const agentImportUrl= environment.agentImportRessource;
const corpImportUrl= environment.corpImportRessource;

@Injectable({
  providedIn: 'root'
})
export class ImportedService {

  constructor(private http:HttpClient) { }
  importAgent(request: any): Observable<any> {
    return this.http.post(agentImportUrl, request);
    }

  importEmplois(request: any): Observable<any> {
      return this.http.post(corpImportUrl, request);
      }
    
  getAll(event?: LazyLoadEvent): Observable<GetAllCorpsResponse> {
    //return this.http.get("assets/data/corps.json", { observe: 'response' })
    return this.http.get(corpUrl, { observe: 'response' })
    .pipe(map(response => {
        let articleResponse: GetAllCorpsResponse = {
          corps: response.body as Corps[]
        };
        return articleResponse;
      }));
  }


  getAllAgent(event?: LazyLoadEvent): Observable<GetAllAgentResponse> {
    //return this.http.get("assets/data/agent.json", { observe: 'response' })
     return this.http.get(agentUrl, { observe: 'response' })
    .pipe(map(response => {
        let agentResponse: GetAllAgentResponse = {
          agents: response.body as Agent[]
        };
        return agentResponse;
      }));
  }
}
