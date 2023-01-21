export interface TypeActe {
    id?:number;
    reference?:string;
    libelle?:string;
    templateUri?: boolean;
    porteActe?:string;
  }
  
  export interface GetAllTypeActeResponse {
    typeActes: TypeActe[];
   }