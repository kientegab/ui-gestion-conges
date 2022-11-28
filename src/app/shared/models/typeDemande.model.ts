export interface TypeDemande {
  id?:number;
  code?:string;
  libelle?:string;
  modePaie?: boolean;
  description?:string;
}

export interface GetAllTypeDemandeResponse {
  typeDemandes: TypeDemande[];
 }
