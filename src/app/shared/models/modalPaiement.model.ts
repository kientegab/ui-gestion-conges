export interface ModalPaiement {
  id?:number;
  libelle?:string;
  description?:string;
}

export interface GetAllModalPaiementResponse {
   modalPaiements: ModalPaiement[];
 }
