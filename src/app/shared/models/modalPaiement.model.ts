import { TypeDemande } from 'src/app/shared/models/typeDemande.model';
export interface ModalPaiement {
  id?:number;
  code?:string;
  libelle?: string;
  desactiver?: boolean;
  typeDemande?: TypeDemande;
}

export interface GetAllModalPaiementResponse {
   modalPaiements: ModalPaiement[];
 }
