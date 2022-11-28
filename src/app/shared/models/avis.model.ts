import { Demande } from './demande.model';
export interface Avis {
  id?:number;
  avisDrh?:string;
  avisSg?: string;
  avisSh?: string;
  avisDg?: string;
  demande?: Demande;
}

export interface GetAllAvisResponse {
   aviss: Avis[];
 }
