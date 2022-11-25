import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { Agent, GetAllAgentResponse } from '../models/agent.model';
import { Article } from '../models/article.model';
import { Corps, GetAllCorpsResponse } from '../models/corp.model';

@Injectable({
  providedIn: 'root'
})
export class ImportedService {

  
  constructor(private http:HttpClient) { }
  getAll(event?: LazyLoadEvent): Observable<GetAllCorpsResponse> {
    return this.http.get("assets/data/corps.json", { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let articleResponse: GetAllCorpsResponse = {
          corps: response.body as Corps[]
        };
        return articleResponse;
      }));
  }


  getAllAgent(event?: LazyLoadEvent): Observable<GetAllAgentResponse> {
    return this.http.get("assets/data/agent.json", { observe: 'response' })
    // return this.http.get(Url, { observe: 'response' })
    .pipe(map(response => {
        let agentResponse: GetAllAgentResponse = {
          agents: response.body as Agent[]
        };
        return agentResponse;
      }));
  }
}
