import { VisaTypeDemande } from './visaTypeDemande.model';
export interface Visa {
  id?:number;
  code?:string;
  libelle?: string;
  visaTypeDemande?: VisaTypeDemande;
}

export interface GetAllVisaResponse {
   visas: Visa[];
 }
