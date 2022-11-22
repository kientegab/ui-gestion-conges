export interface TypeDemande {
  id?:number;
  libelle?:string;
  description?:string;
}

export interface GetAllTypeDemandeResponse {
  typeDemandes: TypeDemande[];
 }
