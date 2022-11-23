export interface TypeStructure {
  id?:number;
  libelle?:string;
  description?:string;
}

export interface GetAllTypeStructureResponse {
   typeStructures: TypeStructure[];
 }
