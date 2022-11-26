import { TypeDemande } from './typeDemande.model';
export interface Avis {
  id?:number;
  avisDrh?:string;
  avisSg?: string;
  avisSh?: string;
  avisDg?: string;
  demande?: TypeDemande;
}

export interface GetAllAvisResponse {
   aviss: Avis[];
 }
