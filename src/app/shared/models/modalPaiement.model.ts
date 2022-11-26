import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
export interface ModalPaiement {
  id?:number;
  libelle?:string;
  description?: string;
  typeDemande?: TypeDemande;
  desactiver?: boolean;
}

export interface GetAllModalPaiementResponse {
   modalPaiements: ModalPaiement[];
 }
