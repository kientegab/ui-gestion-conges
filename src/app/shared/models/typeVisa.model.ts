import { TypeDemande } from "./typeDemande.model";
import { Visa } from "./visa.model";

export interface TypeVisa {
  id?:number;
  visa?: Visa;
  typeDemande? : TypeDemande;
  numeroOrdre? : number ;
}

export interface GetAllTypeVisaResponse {
  typeVisas: TypeVisa[];
 }
