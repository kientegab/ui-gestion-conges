import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
export interface ModalPaiement {
  id?:number;
  libelle?:string;
  description?: string;
  typeDemande?: TypeDemande;
}

export interface GetAllModalPaiementResponse {
   modalPaiements: ModalPaiement[];
 }
