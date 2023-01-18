import { TypeActe } from "./typeActe.model";
import { Demande } from 'src/app/shared/models/demande.model';

export interface Acte {
    id?:number,
    reference?:number;
    enteteMinistere?:string;
    status?: string;
    ampliation?:string;
    annee?:number;
    nomPrenomCreator?: string;
    titreCreator?: string;
    typeActe?: TypeActe
    demandes?: Demande[]
    
  }
  
  export interface GetAllActeResponse {
     actes: Acte[];
   }
  