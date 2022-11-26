import { TypeDemande } from "./typeDemande.model";
import { Visa } from "./visa.model";

export interface VisaTypeDemande {
  visa? : Visa;
  typeDemande? : TypeDemande;
}

export interface GetAllVisaTypeDemandeResponse {
  visaTypeDemandes: VisaTypeDemande[];
 }
