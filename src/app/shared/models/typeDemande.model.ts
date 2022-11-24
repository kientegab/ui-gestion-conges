export interface TypeDemande {
  id?:number;
  libelle?:string;
  modePaie?: boolean;
  description?:string;
}

export interface GetAllTypeDemandeResponse {
  typeDemandes: TypeDemande[];
 }
